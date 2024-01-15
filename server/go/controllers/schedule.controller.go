package controllers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

type ScheduleRequest struct {
	BootcampID  uint          `json:"bootcampId"`
	InitialDate string        `json:"initialDate"`
	Sessions    []SessionData `json:"sessions"`
}

type SessionData struct {
	StartDate string     `json:"startDate"`
	EndDate   string     `json:"endDate"`
	Users     []UserData `json:"users"`
}

type UserData struct {
	Email string `json:"email"`
}

func HttpCreateSchedule(c *fiber.Ctx) error {
	db := database.Db
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "admin" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}

	scheduleRequest := new(ScheduleRequest)
	if err := c.BodyParser(scheduleRequest); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Invalid request body"})
	}

	bootcamp := new(models.Bootcamp)
	if err := db.First(&bootcamp, scheduleRequest.BootcampID).Error; err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": "Bootcamp not found"})
	}

	schedule := &models.Schedule{
		BootcampID: scheduleRequest.BootcampID,
		Bootcamp:   *bootcamp,
		Sessions:   []*models.Session{},
	}

	for _, sessionData := range scheduleRequest.Sessions {
		session := &models.Session{
			StartDate: sessionData.StartDate,
			EndDate:   sessionData.EndDate,
			Schedule:  *schedule,
			User:      []*models.User{},
		}

		for _, userData := range sessionData.Users {
			user := &models.User{}
			if err := db.Where("email = ?", userData.Email).First(user).Error; err != nil {
				return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "User not found"})
			}
			session.User = append(session.User, user)
			if err := models.AssociateUserWithSession(user, session, db); err != nil {
				return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Failed to associate user with session"})
			}
		}
		schedule.Sessions = append(schedule.Sessions, session)
	}

	if err := db.Create(schedule).Error; err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Failed to create schedule"})
	}

	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})
}

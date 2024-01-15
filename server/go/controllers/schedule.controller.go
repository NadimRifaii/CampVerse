package controllers

import (
	"fmt"
	"strconv"

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
	Title     string     `json:"title"`
	Users     []UserData `json:"users"`
}

type UserData struct {
	Email string `json:"email"`
}

func HttpGetSchedule(c *fiber.Ctx) error {
	db := database.Db
	scheduleID := c.Params("id")
	id, err := strconv.ParseUint(scheduleID, 10, 64)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Invalid schedule ID"})
	}
	uintId := uint(id)
	schedule := new(models.Schedule)
	if err := schedule.GetScheduleWithSessionsAndUsers(db, uintId); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}

	// return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})
	cleaned, err := schedule.GetCleanedScheduleWithSessionsAndUsers()
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": cleaned})
}
func HttpGetBootcampSchedules(c *fiber.Ctx) error {
	db := database.Db
	scheduleID := c.Params("id")
	id, err := strconv.ParseUint(scheduleID, 10, 64)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Invalid schedule ID"})
	}
	uintId := uint(id)
	schedule := new(models.Schedule)
	arr, err := schedule.GetSchedulesWithSessionsAndUsersByBootcampID(db, uintId)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	var cleanedSchedules []models.CleanedSchedule
	for _, schedule := range arr {
		cleaned, err := schedule.GetCleanedScheduleWithSessionsAndUsers()
		if err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
		}
		cleanedSchedules = append(cleanedSchedules, cleaned)
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedules": cleanedSchedules})
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
	fmt.Println(scheduleRequest)
	bootcamp := new(models.Bootcamp)
	if err := db.First(&bootcamp, scheduleRequest.BootcampID).Error; err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": "Bootcamp not found"})
	}

	schedule := &models.Schedule{
		BootcampID:  scheduleRequest.BootcampID,
		Bootcamp:    *bootcamp,
		InitialDate: scheduleRequest.InitialDate,
		Sessions:    []*models.Session{},
	}

	if err := db.Create(schedule).Error; err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Failed to create schedule"})
	}

	for _, sessionData := range scheduleRequest.Sessions {
		session := &models.Session{
			StartDate:  sessionData.StartDate,
			EndDate:    sessionData.EndDate,
			Title:      sessionData.Title,
			ScheduleID: schedule.ID, // Set ScheduleID for the session
			User:       []*models.User{},
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

		if err := db.Create(session).Error; err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Failed to create session"})
		}
	}

	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})
}

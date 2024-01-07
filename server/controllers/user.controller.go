package controllers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpGetUser(c *fiber.Ctx) error {
	db := database.Db
	user := new(models.User)
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	if user.UserRole.RoleName == "mentor" {
		mentor := new(models.Mentor)
		if err := mentor.GetMentorByID(db, user.ID); err != nil {
			return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
		}

		var mentorResponse struct {
			Speciality string          `json:"speciality"`
			Position   string          `json:"position"`
			Stacks     []*models.Stack `json:"stacks"`
		}
		mentorResponse.Position = mentor.Position
		mentorResponse.Speciality = mentor.Speciality
		mentorResponse.Stacks = mentor.Stack
		return Loger(c, fiber.StatusAccepted, fiber.Map{"mentor": mentorResponse})
	} else {
		student := new(models.Student)
		if err := student.GetStudentByID(db, user.ID); err != nil {
			return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
		}
		return Loger(c, fiber.StatusAccepted, fiber.Map{"student": student})
	}
}

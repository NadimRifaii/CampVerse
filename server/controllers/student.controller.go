package controllers

import (
	// "github.com/NadimRifaii/campverse/database"
	"errors"

	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func HttpSubmitAssignment(c *fiber.Ctx) error {
	user := new(models.User)
	// db := database.Db
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{})
}
func GetStudent(c *fiber.Ctx, db *gorm.DB) (*models.Student, error) {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "student" {
		return nil, errors.New("Unauthorized")
	}

	mentor := new(models.Student)
	if err := student.GetStudentByID(db, user.ID); err != nil {
		return nil, errors.New("Unauthorized")
	}
	mentor.User = *user

	return student, nil
}

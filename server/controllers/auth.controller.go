package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func Signup(c *fiber.Ctx) error {

}
func validateUserRequest(c *fiber.Ctx, user *models.User) error {
	if err := c.BodyParser(user); err != nil {
		return errors.New("invalid request body")
	} else if user.Email == "" || user.Password == "" {
		return errors.New("missing credentials")
	}
	return nil
}

func loger(c *fiber.Ctx, status int, m fiber.Map) error {
	return c.Status(status).JSON(m)
}
func createUserInDb(c *fiber.Ctx, user *models.User) error {
	db := database.Db
	result := db.Create(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

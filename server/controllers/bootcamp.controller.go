package controllers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func CreateBootcamp(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "admin" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"user": user})
}

func GetAuthUser(c *fiber.Ctx) *models.User {
	if _, ok := c.Locals("error").(string); ok {
		return nil
	}
	if user, ok := c.Locals("user").(*models.User); ok {
		return user
	}
	return nil
}
func createBootcamp(bootcamp *models.Bootcamp) error {
	db := database.Db
	result := db.Create(bootcamp)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

/*
// Retrieving a value from c.Locals
value, ok := c.Locals("key").(string)
if ok {
    // Use the value
}
*/

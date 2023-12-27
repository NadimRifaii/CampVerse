package controllers

import (
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func CreateBootcamp(c *fiber.Ctx) error {
	if errorValue, ok := c.Locals("error").(string); ok {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": errorValue})
	}
	if user, ok := c.Locals("user").(*models.User); ok {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"user": user})
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

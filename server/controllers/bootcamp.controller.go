package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func CreateBootcamp(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "admin" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	bootcamp := new(models.Bootcamp)
	if err := validateBootcampRequest(c, bootcamp); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if err := createBootcampInDb(bootcamp); err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Bootcamp was ceated successfully", "bootcamp": bootcamp})
}

func GetBootcamps(c *fiber.Ctx) error {
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "admin" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	bootcamp := new(models.Bootcamp)
	allBootcamps, err := bootcamp.GetAllBootcamps(db)
	if err != nil {
		return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"bootcamps": allBootcamps})
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
func createBootcampInDb(bootcamp *models.Bootcamp) error {
	db := database.Db
	result := db.Create(bootcamp)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func validateBootcampRequest(c *fiber.Ctx, body *models.Bootcamp) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("invalid request body")
	} else if body.Name == "" {
		return errors.New("missing credentials")
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

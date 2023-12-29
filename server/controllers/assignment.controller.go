package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpCreateAssignment(c *fiber.Ctx) error {
	assignment := new(models.Assignment)
	if err := validateAssignmentRequest(c, assignment); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"assignment": assignment})
}
func validateAssignmentRequest(c *fiber.Ctx, assignment *models.Assignment) error {
	if err := c.BodyParser(assignment); err != nil {
		return errors.New("bad request")
	}
	return nil
}

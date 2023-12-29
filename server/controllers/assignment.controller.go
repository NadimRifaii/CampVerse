package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpCreateAssignment(c *fiber.Ctx) error {
	return nil
}
func validateAssignmentRequest(c *fiber.Ctx, assignment *models.Assignment) error {
	if err := c.BodyParser(assignment); err != nil {
		return errors.New("bad request")
	}
	return nil
}

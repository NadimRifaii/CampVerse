package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpCreateAssignment(c *fiber.Ctx) error {
	assignment := new(models.Assignment)
	if err := validateAssignmentRequest(c, assignment); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	db := database.Db
	mentor, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	assignment.Mentor = *mentor
	if err := CreateRecordInDb(assignment); err != nil {
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

func HttpGetAllAssignments(c *fiber.Ctx) error {
	assignment := new(models.Assignment)
	db := database.Db
	assignments, err := assignment.GetAllAssignments(db)
	if err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"assignments": assignments})
}

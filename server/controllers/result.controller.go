package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpCreateResults(c *fiber.Ctx) error {
	db := database.Db
	_, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	result := new(models.Result)
	if err := validateResultRequest(c, result); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if err := CreateRecordInDb(result); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"result": result})
}

func validateResultRequest(c *fiber.Ctx, result *models.Result) error {
	if err := c.BodyParser(result); err != nil {
		return errors.New("invalid request body")
	}
	return nil
}

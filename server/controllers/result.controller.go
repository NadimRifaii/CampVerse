package controllers

import (
	"errors"
	"strconv"

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

func HttpGetAllResultsInBootcamp(c *fiber.Ctx) error {
	db := database.Db
	idStr := c.Params("id")

	// Convert idStr to uint64
	id64, _ := strconv.ParseUint(idStr, 10, 32)
	id := uint(id64)
	_, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	result := new(models.Result)
	results, err := result.GetAllResultsInBootcamp(db, id)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"resuls": results})
}

func validateResultRequest(c *fiber.Ctx, result *models.Result) error {
	if err := c.BodyParser(result); err != nil {
		return errors.New("invalid request body")
	}
	return nil
}

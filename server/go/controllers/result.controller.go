package controllers

import (
	"errors"
	"strconv"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

type Results struct {
	Results []models.Result `json:"results"`
}

type ResultData struct {
	Week       string         `json:"week"`
	BootcampID uint           `json:"bootcampId"`
	UserID     uint           `json:"userId"`
	Grades     []models.Grade `json:"grades"`
}

func HttpCreateResults(c *fiber.Ctx) error {
	db := database.Db
	_, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}

	var results Results
	if err := c.BodyParser(&results); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}

	for _, result := range results.Results {
		if err := ValidateRequest(c, &result); err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
		}
		if err := CreateRecordInDb(&result); err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
		}
	}

	return Loger(c, fiber.StatusAccepted, fiber.Map{"results": results.Results})
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

type Body struct {
	Week       string `json:"week"`
	BootcampId uint   `json:"bootcampId"`
}

func HttpGetWeeklyResult(c *fiber.Ctx) error {
	body := new(Body)
	db := database.Db
	if err := ValidateRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	result := new(models.Result)
	if err := result.GetWeeklyResult(db, body.Week, body.BootcampId); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"result": result})
}
func ValidateRequest(c *fiber.Ctx, body interface{}) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("invalid request body")
	}
	return nil
}

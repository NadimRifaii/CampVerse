package controllers

import (
	"strconv"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

type ResultsRequestBody struct {
	Results []*models.Result `json:"results"`
}

func HttpCreateResults(c *fiber.Ctx) error {
	results := new(ResultsRequestBody)
	if err := ValidateRequest(c, results); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	idStr := c.Params("id")
	id, err := strconv.ParseUint(idStr, 10, 0)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	for _, result := range results.Results {
		result.WeekId = uint(id)
		if err := CreateRecordInDb(result); err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
		}
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Results were created successfully", "results": results})
}
func HttpGetWeeklyResults(c *fiber.Ctx) error {
	weekIDStr := c.Params("weekId")

	weekID, err := strconv.ParseUint(weekIDStr, 10, 0)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}

	result := new(models.Result)
	result.WeekId = uint(weekID)
	db := database.Db
	results, err := result.GetCleanedResultsByWeekID(db)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"results": results})
}

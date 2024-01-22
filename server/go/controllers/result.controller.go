package controllers

import (
	"strconv"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpCreateResult(c *fiber.Ctx) error {
	result := new(models.Result)
	if err := ValidateRequest(c, result); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	idStr := c.Params("id")
	id, err := strconv.ParseUint(idStr, 10, 0)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	result.WeekId = uint(id)
	if err := CreateRecordInDb(result); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Result was created successfully", "result": result})
}
func HttpGetWeeklyResults(c *fiber.Ctx) error {
	weekIDStr := c.Params("weekId")

	// Convert weekIDStr to uint
	weekID, err := strconv.ParseUint(weekIDStr, 10, 0)
	if err != nil {
		// Handle the error, e.g., return an error response
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid Week ID format",
		})
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

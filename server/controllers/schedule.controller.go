package controllers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/gofiber/fiber/v2"
)

func HttpCreateSchedule(c *fiber.Ctx) error {
	db := database.Db
	user, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"user": user})
}

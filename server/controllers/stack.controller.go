package controllers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func GetAllStacks(c *fiber.Ctx) error {
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	stack := new(models.Stack)
	stacks, err := stack.GetStacks(db)
	if err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"stacks": stacks})
}

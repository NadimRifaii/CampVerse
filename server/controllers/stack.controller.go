package controllers

import (
	"errors"

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
func CreateStack(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	stack := new(models.Stack)
	if err := validateStackRequest(c, stack); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if err := createStackIndB(stack); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Stack created successfully"})
}

func validateStackRequest(c *fiber.Ctx, stack *models.Stack) error {
	if err := c.BodyParser(stack); err != nil {
		return errors.New("faild to parse body request")
	}
	return nil
}
func createStackIndB(stack *models.Stack) error {
	db := database.Db
	result := db.Create(stack)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

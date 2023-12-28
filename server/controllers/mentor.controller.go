package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpAddStackToMentor(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "mentor" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	//
	mentor := new(models.Mentor)
	db := database.Db
	if err := mentor.GetMentorByID(db, user.ID); err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	mentor.User = *user
	//
	stack := new(models.Stack)
	if err := verifyStackRequest(c, stack); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	//
	if err := stack.GetStackByName(db, stack.Name); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if err := mentor.AddStackToMentor(db, stack); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"mentor": mentor})
}
func HttpRemoveStackFromMentor(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "mentor" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	//
	mentor := new(models.Mentor)
	db := database.Db
	if err := mentor.GetMentorByID(db, user.ID); err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	mentor.User = *user
	//
	stack := new(models.Stack)
	if err := verifyStackRequest(c, stack); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	//
	if err := stack.GetStackByName(db, stack.Name); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if err := mentor.RemoveStackFromMentor(db, stack); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"mentor": mentor})
}
func verifyStackRequest(c *fiber.Ctx, stack *models.Stack) error {
	if err := c.BodyParser(stack); err != nil {
		return errors.New("invalid request body")
	}
	return nil
}

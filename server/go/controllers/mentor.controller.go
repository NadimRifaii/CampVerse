package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func HttpAddStackToMentor(c *fiber.Ctx) error {
	return handleMentorAction(c, "add")
}
func HttpRemoveStackFromMentor(c *fiber.Ctx) error {
	return handleMentorAction(c, "remove")
}
func handleMentorAction(c *fiber.Ctx, action string) error {
	db := database.Db
	mentor, stack, err := getMentorAndStack(c, db)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	switch action {
	case "add":
		if err := mentor.AddStackToMentor(db, stack); err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
		}
	case "remove":
		if err := mentor.RemoveStackFromMentor(db, stack); err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
		}
	default:
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Invalid action"})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Mentor action successfull"})
}
func verifyStackRequest(c *fiber.Ctx, stack *models.Stack) error {
	if err := c.BodyParser(stack); err != nil {
		return errors.New("invalid request body")
	}
	return nil
}
func GetMentor(c *fiber.Ctx, db *gorm.DB) (*models.Mentor, error) {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "mentor" {
		return nil, errors.New("Unauthorized")
	}

	mentor := new(models.Mentor)
	if err := mentor.GetMentorByID(db, user.ID); err != nil {
		return nil, errors.New("Unauthorized")
	}
	mentor.User = *user

	return mentor, nil
}

func getStack(c *fiber.Ctx, db *gorm.DB) (*models.Stack, error) {
	stack := new(models.Stack)
	if err := verifyStackRequest(c, stack); err != nil {
		return nil, errors.New("invalid request body")
	}

	if err := stack.GetStackByName(db, stack.Name); err != nil {
		return nil, errors.New("stack not found")
	}

	return stack, nil
}
func getMentorAndStack(c *fiber.Ctx, db *gorm.DB) (*models.Mentor, *models.Stack, error) {
	mentor, err := GetMentor(c, db)
	if err != nil {
		return nil, nil, err
	}

	stack, err := getStack(c, db)
	if err != nil {
		return nil, nil, err
	}

	return mentor, stack, nil
}

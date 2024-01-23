package controllers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func HttpGetAllStacks(c *fiber.Ctx) error {
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

func getStackAndBootcamp(c *fiber.Ctx, db *gorm.DB, stackName, bootcampName string) (*models.Stack, *models.Bootcamp, error) {
	admin := new(models.User)
	if admin = GetAuthUser(c); admin == nil || admin.UserRole.RoleName != "admin" {
		return nil, nil, fiber.NewError(fiber.StatusUnauthorized, "Unauthorized")
	}

	stack := new(models.Stack)
	if err := stack.GetStackByName(db, stackName); err != nil {
		return nil, nil, fiber.NewError(fiber.StatusAccepted, err.Error())
	}

	bootcamp := new(models.Bootcamp)
	if err := bootcamp.GetBootcampByName(db, bootcampName); err != nil {
		return nil, nil, fiber.NewError(fiber.StatusAccepted, err.Error())
	}

	return stack, bootcamp, nil
}
func handleStackAction(c *fiber.Ctx, action string) error {
	db := database.Db
	var body struct {
		StackName    string `json:"stackName"`
		BootcampName string `json:"bootcampName"`
	}
	if err := c.BodyParser(&body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}

	stack, bootcamp, err := getStackAndBootcamp(c, db, body.StackName, body.BootcampName)
	if err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	switch action {
	case "add":
		if err := bootcamp.AddStackToBootcamp(db, stack); err != nil {
			return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
		}
	case "remove":
		if err := bootcamp.RemoveStackFromBootcamp(db, stack); err != nil {
			return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
		}
	default:
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Invalid action"})
	}
	return Loger(c, fiber.StatusNotFound, fiber.Map{"message": "Stack action successfull"})
}

// AddStack handles the addition of a stack to a bootcamp.
func HttpAddStack(c *fiber.Ctx) error {
	return handleStackAction(c, "add")
}

// RemoveStack handles the removal of a stack from a bootcamp.
func HttpRemoveStack(c *fiber.Ctx) error {
	return handleStackAction(c, "remove")
}
func HttpCreateCurriculum(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	curriculum := new(models.Curriculum)
	if err := ValidateRequest(c, curriculum); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"err": err.Error()})
	}
	if err := CreateRecordInDb(curriculum); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Stack created successfully"})
}

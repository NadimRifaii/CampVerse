package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreateBootcamp(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "admin" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	bootcamp := new(models.Bootcamp)
	if err := validateBootcampRequest(c, bootcamp); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if err := createBootcampInDb(bootcamp); err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Bootcamp was ceated successfully", "bootcamp": bootcamp})
}

func GetBootcamps(c *fiber.Ctx) error {
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "admin" {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	bootcamp := new(models.Bootcamp)
	allBootcamps, err := bootcamp.GetAllBootcamps(db)
	if err != nil {
		return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"bootcamps": allBootcamps})
}

func GetBootcampUsers(c *fiber.Ctx) error {
	id := c.Params("id")
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	bootcamp := new(models.Bootcamp)
	bootcamp.GetBootcampByID(db, id)
	users, err := bootcamp.GetUsersInBootcamp(db)
	if err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"bootcamp": bootcamp, "users": users})
}

func GetUserBootcamps(c *fiber.Ctx) error {
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	bootcamps, err := user.GetBootcamps(db)
	if err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"user": user, "bootcamps": bootcamps})
}
func getUserAndBootcamp(c *fiber.Ctx, db *gorm.DB, userEmail, bootcampName string) (*models.User, *models.Bootcamp, error) {
	admin := new(models.User)
	if admin = GetAuthUser(c); admin == nil || admin.UserRole.RoleName != "admin" {
		return nil, nil, fiber.NewError(fiber.StatusUnauthorized, "Unauthorized")
	}

	user := new(models.User)
	if err := user.GetUserByEmail(userEmail, db); err != nil {
		return nil, nil, fiber.NewError(fiber.StatusAccepted, err.Error())
	}

	bootcamp := new(models.Bootcamp)
	if err := bootcamp.GetBootcampByName(db, bootcampName); err != nil {
		return nil, nil, fiber.NewError(fiber.StatusAccepted, err.Error())
	}

	return user, bootcamp, nil
}

func AddUser(c *fiber.Ctx) error {
	db := database.Db
	var body struct {
		Email        string `json:"email"`
		BootcampName string `json:"bootcampName"`
	}
	if err := c.BodyParser(&body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}

	user, bootcamp, err := getUserAndBootcamp(c, db, body.Email, body.BootcampName)
	if err != nil {
		return Loger(c, err.(*fiber.Error).Code, fiber.Map{"error": err.Error()})
	}

	if err := bootcamp.AddUserToBootcamp(db, user); err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}

	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "User added successfully"})
}

func RemoveUser(c *fiber.Ctx) error {
	db := database.Db
	var body struct {
		Email        string `json:"email"`
		BootcampName string `json:"bootcampName"`
	}
	if err := c.BodyParser(&body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}

	user, bootcamp, err := getUserAndBootcamp(c, db, body.Email, body.BootcampName)
	if err != nil {
		return Loger(c, err.(*fiber.Error).Code, fiber.Map{"error": err.Error()})
	}

	if err := bootcamp.RemoveUserFromBootcamp(db, user); err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}

	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "User removed successfully"})
}
func GetAuthUser(c *fiber.Ctx) *models.User {
	if _, ok := c.Locals("error").(string); ok {
		return nil
	}
	if user, ok := c.Locals("user").(*models.User); ok {
		return user
	}
	return nil
}
func createBootcampInDb(bootcamp *models.Bootcamp) error {
	db := database.Db
	result := db.Create(bootcamp)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func validateBootcampRequest(c *fiber.Ctx, body *models.Bootcamp) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("invalid request body")
	} else if body.Name == "" {
		return errors.New("missing credentials")
	}
	return nil
}

/*
// Retrieving a value from c.Locals
value, ok := c.Locals("key").(string)
if ok {
    // Use the value
}
*/

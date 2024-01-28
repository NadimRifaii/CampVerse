package controllers

import (
	"errors"
	"fmt"

	"github.com/NadimRifaii/campverse/database"
	"github.com/gofiber/fiber/v2"
)

func Loger(c *fiber.Ctx, status int, m fiber.Map) error {
	return c.Status(status).JSON(m)
}
func CreateRecordInDb(record interface{}) error {
	db := database.Db
	result := db.Create(record)
	return checkExistingEmail(result)
}
func ValidateRequest(c *fiber.Ctx, body interface{}) error {
	if err := c.BodyParser(body); err != nil {
		fmt.Println("Error parsing request body:", err)
		fmt.Println("Parsed body:", body)
		return errors.New("invalid request body")
	}
	return nil
}

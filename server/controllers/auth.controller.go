package controllers

import (
	"github.com/gofiber/fiber/v2"
)

func Signup(c *fiber.Ctx) error {

}
func loger(c *fiber.Ctx, status int, m fiber.Map) error {
	return c.Status(status).JSON(m)
}

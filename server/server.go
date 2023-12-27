package main

import (
	"os"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/initializers"
	"github.com/gofiber/fiber/v2"
)

func init() {
	initializers.Load()
	database.ConnectToDb()
}
func main() {
	app := fiber.New()
	app.Listen(os.Getenv("PORT"))
}

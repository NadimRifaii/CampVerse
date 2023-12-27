package main

import (
	"os"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/initializers"
	"github.com/NadimRifaii/campverse/routes"
	"github.com/gofiber/fiber/v2"
)

func init() {
	initializers.Load()
	database.ConnectToDb()
}
func main() {
	app := fiber.New()
	authGroup := app.Group("/auth")
	bootcampGroup := app.Group("/bootcamp")
	routes.AuthRoutes(authGroup)
	routes.BootcampRoutes(bootcampGroup)
	app.Listen(os.Getenv("PORT"))
}

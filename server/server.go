package main

import (
	"os"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/initializers"
	"github.com/NadimRifaii/campverse/middlewares"
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
	stackGroup := app.Group("/stacks")
	bootcampGroup.Use(middlewares.RequireAuth)
	stackGroup.Use(middlewares.RequireAuth)
	routes.AuthRoutes(authGroup)
	routes.BootcampRoutes(bootcampGroup)
	routes.StackRoutes(stackGroup)
	app.Listen(os.Getenv("PORT"))
}

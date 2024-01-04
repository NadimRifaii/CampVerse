package main

import (
	"os"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/initializers"
	"github.com/NadimRifaii/campverse/middlewares"
	"github.com/NadimRifaii/campverse/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	initializers.LoadEnv()
	database.ConnectToDb()
	initializers.MigrateUserRoles()
}
func setupApp() *fiber.App {
	app := fiber.New()
	app.Use(cors.New())
	return app
}
func main() {
	app := setupApp()

	protectedGroups := []fiber.Router{
		app.Group("/auth"),
		app.Group("/bootcamp"),
		app.Group("/stacks"),
		app.Group("/mentor"),
		app.Group("/schedule"),
		app.Group("/assignment"),
		app.Group("/result"),
	}
	for _, group := range protectedGroups {
		group.Use(middlewares.RequireAuth)
	}

	routes.AuthRoutes(protectedGroups[0])
	routes.BootcampRoutes(protectedGroups[1])
	routes.StackRoutes(protectedGroups[2])
	routes.MentorRoutes(protectedGroups[3])
	routes.ScheduleRoutes(protectedGroups[4])
	routes.AssignmentRoutes(protectedGroups[5])
	routes.ResultRoutes(protectedGroups[6])

	app.Listen(os.Getenv("PORT"))
}

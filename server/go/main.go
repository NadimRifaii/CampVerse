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
	app.Static("/", "./public")
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))
	return app
}

func setupProtectedGroups(app *fiber.App, paths []string) []fiber.Router {
	var groups []fiber.Router
	for _, path := range paths {
		group := app.Group(path)
		group.Use(middlewares.RequireAuth)
		groups = append(groups, group)
	}
	return groups
}

func registerRoutes(groups []fiber.Router, routeFuncs ...func(group fiber.Router)) {
	for i, routeFunc := range routeFuncs {
		routeFunc(groups[i])
	}
}

func main() {
	app := setupApp()

	protectedPaths := []string{"/auth", "/schedule", "/bootcamp", "/stacks", "/mentor", "/assignment", "/result", "/user", "/curriculum"}
	groups := setupProtectedGroups(app, protectedPaths)

	registerRoutes(groups,
		routes.AuthRoutes,
		routes.ScheduleRoutes,
		routes.BootcampRoutes,
		routes.StackRoutes,
		routes.MentorRoutes,
		routes.AssignmentRoutes,
		routes.ResultRoutes,
		routes.UserRoutes,
		routes.CurriculumRoutes,
	)
	app.Listen(os.Getenv("PORT")) //
}

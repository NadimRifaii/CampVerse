package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func AssignmentRoutes(app fiber.Router) {
	app.Post("/", controllers.HttpCreateAssignment)
	app.Get("/", controllers.HttpGetAllAssignments)
}

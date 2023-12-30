package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func AssignmentRoutes(app fiber.Router) {
	app.Post("/", controllers.HttpCreateAssignment)
	app.Post("/submit", controllers.HttpSubmitAssignment)
	app.Get("/submit", controllers.HttpGetSubmittedFiles)
	app.Get("/", controllers.HttpGetAllAssignments)
}

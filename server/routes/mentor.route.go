package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func MentorRoutes(app fiber.Router) {
	app.Post("/", controllers.HttpAddStackToMentor)
}

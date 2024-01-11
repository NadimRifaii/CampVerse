package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func CurriculumRoutes(app fiber.Router) {
	app.Post("/", controllers.HttpGetBootcampCurriculums)
}

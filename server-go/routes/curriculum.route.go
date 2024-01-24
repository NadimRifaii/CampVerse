package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func CurriculumRoutes(app fiber.Router) {
	app.Post("/", controllers.HttpGetBootcampCurriculums)
	app.Post("/add-to-bootcamp", controllers.HttpCreateCurriculum)
	app.Post("/week-curriculum", controllers.HttpGetBootcampWeekCurriculum)
}

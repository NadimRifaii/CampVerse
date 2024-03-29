package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func ScheduleRoutes(app fiber.Router) {
	app.Post("/", controllers.HttpCreateSchedule)
	app.Get("/:id", controllers.HttpGetSchedule)
	app.Get("/bootcamp-schedule/:id", controllers.HttpGetBootcampSchedules)
}

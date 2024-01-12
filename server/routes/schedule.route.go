package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func ScheduleRoutes(app fiber.Router) {
	app.Post("/schedule-days", controllers.HttpGetScheduleByWeek)
	app.Post("/bootcamp-schedule", controllers.HttpGetBootcampSchedule)
	app.Post("/", controllers.HttpCreateSchedule)
}

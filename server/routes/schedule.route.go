package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func ScheduleRoutes(app fiber.Router) {
	app.Get("/", controllers.HttpGetScheduleByWeek)
	app.Post("/", controllers.HttpCreateSchedule)
}

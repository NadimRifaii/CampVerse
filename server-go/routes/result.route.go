package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func ResultRoutes(app fiber.Router) {
	app.Post("/week-curriculum", controllers.HttpTestingWeeklyResults)
	app.Post("/:id", controllers.HttpCreateResults)
	app.Post("/user-results/:weekId", controllers.HttpGetUserWeeklyResults)
	app.Get("/:weekId", controllers.HttpGetWeeklyResults)
}

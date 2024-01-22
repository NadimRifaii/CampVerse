package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func ResultRoutes(app fiber.Router) {
	app.Post("/:id", controllers.HttpCreateResults)
	app.Get("/:weekId", controllers.HttpGetWeeklyResults)
}

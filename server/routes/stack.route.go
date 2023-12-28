package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func StackRoutes(app fiber.Router) {
	app.Get("/", controllers.GetAllStacks)
	app.Post("/", controllers.CreateStack)
	app.Post("/add-to-bootcamp", controllers.AddStack)
}

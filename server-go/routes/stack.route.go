package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func StackRoutes(app fiber.Router) {
	app.Get("/", controllers.HttpGetAllStacks)
	app.Post("/", controllers.HttpCreateCurriculum)
	app.Post("/add-to-bootcamp", controllers.HttpAddStack)
	app.Post("/remove-from-bootcamp", controllers.HttpRemoveStack)
}

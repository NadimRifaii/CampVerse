package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/NadimRifaii/campverse/middlewares"
	"github.com/gofiber/fiber/v2"
)

func BootcampRoutes(app fiber.Router) {
	app.Post("/bootcamp", middlewares.RequireAuth, controllers.CreateBootcamp)
	app.Get("/bootcamp", middlewares.RequireAuth, controllers.GetBootcamps)
}

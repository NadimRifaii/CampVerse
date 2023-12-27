package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/NadimRifaii/campverse/middlewares"
	"github.com/gofiber/fiber/v2"
)

func BootcampRoutes(app fiber.Router) {
	app.Post("/", middlewares.RequireAuth, controllers.CreateBootcamp)
	app.Get("/", middlewares.RequireAuth, controllers.GetBootcamps)
	app.Get("/user-bootcamps", middlewares.RequireAuth, controllers.GetUserBootcamps)
}

package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/NadimRifaii/campverse/middlewares"
	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app fiber.Router) {
	app.Post("/signup", controllers.Signup)
	app.Post("/login", controllers.Login)
	app.Post("/bootcamp", middlewares.RequireAuth, controllers.CreateBootcamp)
	app.Get("/bootcamp", middlewares.RequireAuth, controllers.GetBootcamps)
}

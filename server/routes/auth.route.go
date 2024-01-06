package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app fiber.Router) {
	app.Post("/signup", controllers.HttpSignup)
	app.Post("/login", controllers.HttpLogin)
	app.Post("/refresh", controllers.HttpRefresh)
}

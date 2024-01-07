package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	app.Get("/", controllers.HttpGetUser)
	app.Put("/", controllers.HttpUpdateUserProfile)
	app.Post("/profile", controllers.HttpUploadImage)
}

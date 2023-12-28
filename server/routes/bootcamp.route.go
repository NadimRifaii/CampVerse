package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func BootcampRoutes(app fiber.Router) {
	app.Get("/", controllers.HttpGetBootcamps)
	app.Get("/user-bootcamps", controllers.HttpGetUserBootcamps)
	app.Get("/:id", controllers.HttpGetBootcampUsers)
	app.Post("/bootcamp-stacks", controllers.HttpGetBootcampStacks)
	app.Post("/", controllers.HttpCreateBootcamp)
	app.Post("/add-user", controllers.HttpAddUser)
	app.Post("/remove-user", controllers.HttpRemoveUser)
}

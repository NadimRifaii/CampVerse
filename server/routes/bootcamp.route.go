package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func BootcampRoutes(app fiber.Router) {
	app.Post("/", controllers.CreateBootcamp)
	app.Get("/", controllers.GetBootcamps)
	app.Get("/user-bootcamps", controllers.GetUserBootcamps)
	app.Get("/:id", controllers.GetBootcampUsers)
	app.Post("/add-user", controllers.AddUser)
	app.Post("/remove-user", controllers.RemoveUser)
}

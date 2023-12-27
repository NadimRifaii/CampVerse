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
	app.Get("/:id", middlewares.RequireAuth, controllers.GetBootcampUsers)
	app.Post("/add-user", middlewares.RequireAuth, controllers.AddUser)
	app.Post("/remove-user", middlewares.RequireAuth, controllers.RemoveUser)
}

package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

type Test struct {
	Status   string   `json:"status"`
	Messages []string `json:"messages"`
}

func AuthRoutes(app fiber.Router) {
	app.Get("/test", func(c *fiber.Ctx) error {
		t := Test{
			Status:   "OKKKK",
			Messages: []string{},
		}
		return controllers.Loger(c, fiber.StatusOK, fiber.Map{"response": t})
	})

	app.Post("/signup", controllers.HttpSignup)
	app.Post("/login", controllers.HttpLogin)
	app.Post("/refresh", controllers.HttpRefresh)
}

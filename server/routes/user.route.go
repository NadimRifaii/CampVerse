package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app fiber.Router) {
	app.Get("/", controllers.HttpGetUser)
	app.Get("/all-users", controllers.HttpGetAllUsers)
	app.Get("/all-mentors", controllers.HttpGetAllMentorUsers)
	app.Get("/all-students", controllers.HttpGetAllStudentUsers)
	app.Put("/", controllers.HttpUpdateUserProfile)
	app.Put("/role", controllers.HttpUpdateUserRole)
	app.Post("/profile", controllers.HttpUploadImage)
}

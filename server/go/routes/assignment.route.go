package routes

import (
	"github.com/NadimRifaii/campverse/controllers"
	"github.com/gofiber/fiber/v2"
)

func AssignmentRoutes(app fiber.Router) {
	app.Post("/", controllers.HttpCreateAssignment)
	app.Post("/submit", controllers.HttpSubmitAssignment)
	app.Get("/user-submissions", controllers.HttpGetSubmittedFiles)
	app.Get("/", controllers.HttpGetAllAssignments)
	app.Post("/stack-assignments", controllers.HttpGetAssignmentsByStackAndBootcamp)
	app.Post("/upload-file", controllers.HttpUploadFile)
	app.Get("/assignment-files", controllers.HttpGetFilesByName)
	app.Get("/download", controllers.HttpDownloadFile)
	app.Get("/bootcamp-assignments", controllers.HttpGetBootcampAssignments)
	app.Post("/assignment-submissions", controllers.HttpGetNumOfAssignmentSubmissions)
	app.Get("/get-feedback", controllers.HttpGetFeedback)
}

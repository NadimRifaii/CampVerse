package controllers

import (
	"errors"
	"github.com/NadimRifaii/campverse/database"

	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type SubmissionBody struct {
	StackName       string                   `json:"stackName"`
	AssignmentTitle string                   `json:"assignmentTitle"`
	SubmissionFiles []*models.SubmissionFile `json:"files"`
}

func HttpSubmitAssignment(c *fiber.Ctx) error {
	db := database.Db
	student, err := GetStudent(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	submissionBody := new(SubmissionBody)
	bodyErr := validateSubmissionRequest(c, submissionBody)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": bodyErr.Error()})
	}
	studentSubmission := new(models.StudentSubmission)
	if err := populateSubmission(studentSubmission, submissionBody, db); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	studentSubmission.StudentId = student.ID
	if err := studentSubmission.CreateSubmission(db); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"studentSubmission": studentSubmission.SubmissionFiles})
}

// func HttpGetSubmittedFiles(c *fiber.Ctx) error {
// 	db := database.Db
// 	student, err := GetStudent(c, db)
// 	if err != nil {
// 		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
// 	}
// 	submissions, err := student.GetStudentSubmissions(db)
// 	if err != nil {
// 		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
// 	}
// 	return Loger(c, fiber.StatusAccepted, fiber.Map{"submissions": submissions})
// }

func GetStudent(c *fiber.Ctx, db *gorm.DB) (*models.Student, error) {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil || user.UserRole.RoleName != "student" {
		return nil, errors.New("Unauthorized")
	}
	student := new(models.Student)
	if err := student.GetStudentByID(db, user.ID); err != nil {
		return nil, errors.New("Unauthorized")
	}
	student.User = *user

	return student, nil
}
func validateSubmissionRequest(c *fiber.Ctx, submission *SubmissionBody) error {
	if err := c.BodyParser(submission); err != nil {
		return errors.New("bad request")
	}
	return nil
}
func populateSubmission(studentSubmission *models.StudentSubmission, body *SubmissionBody, db *gorm.DB) error {
	stack := new(models.Stack)
	if stackErr := stack.GetStackByName(db, body.StackName); stackErr != nil {
		return errors.New("Stack not found")
	}
	studentSubmission.StackId = stack.ID
	assignment := new(models.Assignment)
	if assignmentErr := assignment.GetAssignmentByTitle(db, body.AssignmentTitle); assignmentErr != nil {
		return errors.New("assignment not found")
	}
	studentSubmission.AssignmentId = assignment.ID
	studentSubmission.SubmissionFiles = body.SubmissionFiles
	return nil
}

package controllers

import (
	"errors"
	"github.com/NadimRifaii/campverse/database"

	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type SubmissionBody struct {
	StackName       string `json:"stackName"`
	AssignmentTitle string `json:"assignmentTitle"`
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
	stack := new(models.Stack)
	if stackErr := stack.GetStackByName(db, submissionBody.StackName); stackErr != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": bodyErr.Error()})
	}
	assignment := new(models.Assignment)
	if assignmentErr := assignment.GetAssignmentByTitle(db, submissionBody.AssignmentTitle); assignmentErr != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": assignmentErr.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"student": student, "assignment": assignment, "stack": stack})
}

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

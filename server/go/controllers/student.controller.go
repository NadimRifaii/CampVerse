package controllers

import (
	"context"
	"errors"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/NadimRifaii/campverse/database"
	"github.com/sashabaranov/go-openai"

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
	bodyErr := ValidateRequest(c, submissionBody)
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
	return Loger(c, fiber.StatusAccepted, fiber.Map{"studentSubmission": studentSubmission})
}

func HttpGetSubmittedFiles(c *fiber.Ctx) error {
	db := database.Db
	student, err := GetStudent(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	submissions, err := student.GetStudentSubmissions(db)
	if err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"submissions": submissions})
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

	return student, nil
}
func populateSubmission(studentSubmission *models.StudentSubmission, body *SubmissionBody, db *gorm.DB) error {
	stack := new(models.Stack)
	if stackErr := stack.GetStackByName(db, body.StackName); stackErr != nil {
		return errors.New("stack not found")
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
func ReadFileContent(c *fiber.Ctx) error {
	substring := c.Query("substring")
	if substring == "" {
		return errors.New("file name invalid")
	}

	fileDir := "public/files"
	files, err := ioutil.ReadDir(fileDir)
	if err != nil {
		return errors.New(err.Error())
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}
		if strings.Contains(file.Name(), substring) {
			filePath := filepath.Join(fileDir, file.Name())
			content, err := ioutil.ReadFile(filePath)
			if err != nil {
				return errors.New(err.Error())
			}
			return c.JSON(fiber.Map{"content": string(content)})
		}
	}

	return errors.New("file not found")
}

func openAi() (string, error) {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return "", errors.New("Invalid api key")
	}

	client := openai.NewClient(apiKey)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "I want you to give me an json object , just json object and don't say anything else , the json object is of this form {name:'',lastname:''}",
				},
			},
		},
	)
	if err != nil {
		return "", errors.New(err.Error())
	}

	return resp.Choices[0].Message.Content, nil
}

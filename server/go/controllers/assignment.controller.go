package controllers

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"github.com/sashabaranov/go-openai"
)

type AssignmentRequest struct {
	Assignment   models.Assignment `json:"assignment"`
	BootcampName string            `json:"bootcampName"`
	StackName    string            `json:"stackName"`
}

func HttpCreateAssignment(c *fiber.Ctx) error {
	body := new(AssignmentRequest)
	assignment := new(models.Assignment)
	if err := ValidateRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	assignment = &body.Assignment
	if err := populateAssignment(c, assignment, body); err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	if err := CreateRecordInDb(assignment); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"assignment": assignment})
}

func populateAssignment(c *fiber.Ctx, assignment *models.Assignment, body *AssignmentRequest) error {
	db := database.Db
	mentor, mentorErr := GetMentor(c, db)
	if mentorErr != nil {
		return errors.New("mentor not found")
	}
	assignment.MentorID = mentor.ID
	bootcamp := new(models.Bootcamp)
	if bootcampErr := bootcamp.GetBootcampByName(db, body.BootcampName); bootcampErr != nil {
		return errors.New("bootcamp not found")
	}
	stack := new(models.Stack)
	if stackErr := stack.GetStackByName(db, body.StackName); stackErr != nil {
		return errors.New("stack not found")
	}
	assignment.BootcampID = bootcamp.ID
	assignment.StackID = stack.ID
	return nil
}
func HttpGetAllAssignments(c *fiber.Ctx) error {
	assignment := new(models.Assignment)
	db := database.Db
	assignments, err := assignment.GetAllAssignments(db)
	if err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"assignments": assignments})
}
func HttpGetAssignmentsByStackAndBootcamp(c *fiber.Ctx) error {
	assignment := new(models.Assignment)
	db := database.Db

	var requestBody struct {
		StackID    uint `json:"stackID"`
		BootcampID uint `json:"bootcampID"`
	}
	if err := c.BodyParser(&requestBody); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	assignments, err := assignment.GetAssignmentsByStackAndBootcamp(db, requestBody.StackID, requestBody.BootcampID)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"assignments": assignments})
}

type FileInfo struct {
	Name        string `json:"name"`
	Size        int64  `json:"size"`
	ModTime     string `json:"mod_time"`
	DownloadURL string `json:"download_url"`
	Base64Data  string `json:"base64_data"`
}

func HttpGetFilesByName(c *fiber.Ctx) error {
	fileDir := "public/files"

	substring := c.Query("substring")
	if substring == "" {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Substring parameter is missing"})
	}

	files, err := ioutil.ReadDir(fileDir)
	if err != nil {
		return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": err.Error()})
	}

	var matchingFiles []FileInfo
	for _, file := range files {
		if file.IsDir() {
			continue
		}
		if strings.Contains(file.Name(), substring) {
			fileInfo := FileInfo{
				Name:        file.Name(),
				Size:        file.Size(),
				ModTime:     file.ModTime().String(),
				DownloadURL: fmt.Sprintf("/download?filename=%s", file.Name()),
			}
			matchingFiles = append(matchingFiles, fileInfo)
		}
	}

	return Loger(c, fiber.StatusOK, fiber.Map{"files": matchingFiles})
}
func HttpDownloadFile(c *fiber.Ctx) error {

	substring := c.Query("substring")
	if substring == "" {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Substring parameter is missing"})
	}
	fileDir := "public/files"
	files, err := ioutil.ReadDir(fileDir)
	if err != nil {
		return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": err.Error()})
	}
	for _, file := range files {
		if file.IsDir() {
			continue
		}
		if strings.Contains(file.Name(), substring) {
			filePath := filepath.Join(fileDir, file.Name())
			return c.Download(filePath, file.Name())
		}
	}
	return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "File not found"})
}
func HttpGetBootcampAssignments(c *fiber.Ctx) error {
	bootcampId := c.Query("id")
	id, err := strconv.ParseUint(bootcampId, 10, 64)
	if err != nil {
		fmt.Println("Error:", err)
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	db := database.Db
	finalBootcampId := uint(id)
	assignment := new(models.Assignment)
	assignments, err := assignment.GetAssignmentsByBootcampID(db, finalBootcampId)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"assignments": assignments})
}
func HttpGetNumOfAssignmentSubmissions(c *fiber.Ctx) error {
	var body struct {
		AssignmentTitle string `json:"assignmentTitle"`
	}
	if err := ValidateRequest(c, &body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	db := database.Db
	assignment := new(models.Assignment)
	assignment.GetAssignmentByTitle(db, body.AssignmentTitle)
	submissions, err := assignment.GetAllAssignmentSubmissions(db)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"numberOfSubmissions": len(submissions), "submisssions": submissions})
}
func HttpGetFeedback(c *fiber.Ctx) error {
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

func getFeedback() (string, error) {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		return "", errors.New("invalid api key")
	}

	client := openai.NewClient(apiKey)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "I am gonna give a file content, and i want you to read it and give a feedback on it , just give the feedback and nothing else . And i return the point of approvments in a json object and i want a field called summarize and each point of approvement is also a key in the json object.",
				},
			},
		},
	)
	if err != nil {
		return "", errors.New(err.Error())
	}

	return resp.Choices[0].Message.Content, nil
}

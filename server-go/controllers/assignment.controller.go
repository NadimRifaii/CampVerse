package controllers

import (
	"context"
	"encoding/json"
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
			content, err := os.ReadFile(filePath)
			if err != nil {
				return errors.New(err.Error())
			}
			return Loger(c, fiber.StatusAccepted, fiber.Map{"filePath": filePath, "content": string(content)})
			feedback, err := getFeedback(string(content))
			if err != nil {
				return errors.New(err.Error())
			}

			// JSON string into map, like Json.Parse and stringify in js
			var feedbackMap map[string]interface{}
			if err := json.Unmarshal([]byte(feedback), &feedbackMap); err != nil {
				return errors.New(err.Error())
			}
			return c.Status(200).JSON(feedbackMap)
		}
	}
	return Loger(c, fiber.StatusNotFound, fiber.Map{"error": "File was not found"})
}
func getFeedback(fileContent string) (string, error) {
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
					Role:    openai.ChatMessageRoleSystem,
					Content: "You are a helpful assistant helping the mentor of a student providing feedback on a student document, give your opinion on the student's work, and give his work a grade out of 10,make your response format in a valid json object, with two keys the feedback and the grade.",
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: fileContent,
				},
			},
		},
	)
	if err != nil {
		return "", errors.New(err.Error())
	}

	feedback := resp.Choices[0].Message.Content
	return feedback, nil
}

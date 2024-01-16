package controllers

import (
	"encoding/base64"
	"errors"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
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
			filePath := filepath.Join(fileDir, file.Name())
			content, err := ioutil.ReadFile(filePath)
			if err != nil {
				return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": err.Error()})
			}

			fileInfo := FileInfo{
				Name:        file.Name(),
				Size:        file.Size(),
				ModTime:     file.ModTime().String(),
				DownloadURL: fmt.Sprintf("/download?filename=%s", file.Name()),
				Base64Data:  base64.StdEncoding.EncodeToString(content),
			}
			matchingFiles = append(matchingFiles, fileInfo)
		}
	}

	return Loger(c, fiber.StatusOK, fiber.Map{"files": matchingFiles})
}

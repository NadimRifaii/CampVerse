package controllers

import (
	"errors"

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
	if err := validateAssignmentRequest(c, body); err != nil {
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
func validateAssignmentRequest(c *fiber.Ctx, assignment *AssignmentRequest) error {
	if err := c.BodyParser(assignment); err != nil {
		return errors.New("bad request")
	}
	return nil
}
func populateAssignment(c *fiber.Ctx, assignment *models.Assignment, body *AssignmentRequest) error {
	db := database.Db
	mentor, mentorErr := GetMentor(c, db)
	if mentorErr != nil {
		return errors.New("mentor not found")
	}
	assignment.Mentor = *mentor
	bootcamp := new(models.Bootcamp)
	if bootcampErr := bootcamp.GetBootcampByName(db, body.BootcampName); bootcampErr != nil {
		return errors.New("bootcamp not found")
	}
	stack := new(models.Stack)
	if stackErr := stack.GetStackByName(db, body.StackName); stackErr != nil {
		return errors.New("stack not found")
	}
	assignment.Bootcamp = *bootcamp
	assignment.Stack = *stack
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

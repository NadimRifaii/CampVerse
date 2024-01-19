package models

import (
	"errors"

	"gorm.io/gorm"
)

type Assignment struct {
	gorm.Model
	Title             string `json:"assignmentTitle"`
	Description       string `json:"description" gorm:"not null;size:255"`
	DueDate           string `json:"dueDate" gorm:"size:255"`
	MentorID          uint
	StackID           uint
	BootcampID        uint
	AssignmentFiles   []*AssignmentFile    `json:"files"`
	Instructions      []*Instruction       `json:"instructions"`
	StudentSubmission []*StudentSubmission //
}

type Instruction struct {
	gorm.Model
	Title        string `json:"instructionTitle" gorm:"size:255"`
	Content      string `json:"content" gorm:"size:255"`
	AssignmentID uint
}
type AssignmentFile struct {
	gorm.Model
	FileName     string `json:"fileName" gorm:"not null;size:255;unique"`
	FileType     string `json:"fileType" gorm:"default:'pdf';size:255"`
	FileUrl      string `json:"fileUrl" gorm:"not null;size:255;"`
	AssignmentId uint
}

func (a *Assignment) GetAllAssignments(db *gorm.DB) ([]Assignment, error) {
	var assignments []Assignment

	if err := db.Preload("AssignmentFiles").Find(&assignments).Error; err != nil {
		return nil, err
	}
	/*
		Preload method to eager load the associated Bootcamp, Mentor, and Stack for each assignment
	*/
	return assignments, nil
}
func (assignment *Assignment) GetAssignmentByTitle(db *gorm.DB, title string) error {
	if db.Find(assignment, "title = ?", title); assignment.ID == 0 {
		return errors.New("Assignment not found")
	}
	return nil
}
func (assignment *Assignment) GetAssignmentsByStackAndBootcamp(db *gorm.DB, stackID, bootcampID uint) ([]Assignment, error) {
	var assignments []Assignment
	if err := db.Where("stack_id = ? AND bootcamp_id = ?", stackID, bootcampID).
		Preload("AssignmentFiles").
		Preload("Instructions").
		Preload("StudentSubmission").
		Find(&assignments).Error; err != nil {
		return nil, err
	}
	return assignments, nil
}

type AssignmentResponse struct {
	Id              uint              `json:"id"`
	Title           string            `json:"title"`
	DueDate         string            `json:"dueDate"`
	Stack           Stack             `json:"stack"`
	AssignmentFiles []*AssignmentFile `json:"assignmentFiles"`
	Instructions    []*Instruction    `json:"instructions"`
}

func (a *Assignment) GetAssignmentsByBootcampID(db *gorm.DB, bootcampID uint) ([]AssignmentResponse, error) {
	var assignments []Assignment
	if err := db.Preload("AssignmentFiles").Preload("Instructions").
		Where("bootcamp_id = ?", bootcampID).Find(&assignments).Error; err != nil {
		return nil, err
	}

	var response []AssignmentResponse
	for _, assignment := range assignments {
		var stack Stack
		if err := db.First(&stack, assignment.StackID).Error; err != nil {
			return nil, err
		}

		assignmentData := AssignmentResponse{
			Id:              assignment.ID,
			Title:           assignment.Title,
			DueDate:         assignment.DueDate,
			Stack:           stack,
			AssignmentFiles: assignment.AssignmentFiles,
			Instructions:    assignment.Instructions,
		}
		response = append(response, assignmentData)
	}
	return response, nil
}

func (a *Assignment) GetAllAssignmentSubmissions(db *gorm.DB) ([]*StudentSubmission, error) {
	var submissions []*StudentSubmission

	// Assuming there's a foreign key relationship between Assignment and StudentSubmission
	if err := db.Preload("SubmissionFiles").Preload("Student").Preload("Student.User").Model(a).Association("StudentSubmission").Find(&submissions); err != nil {
		return nil, err
	}

	return submissions, nil
}

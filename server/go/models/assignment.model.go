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
	if db.Find(assignment, "description = ?", title); assignment.ID == 0 {
		return errors.New("Assignment not found")
	}
	return nil
}
func (assignment *Assignment) GetStackAssignments(db *gorm.DB, bootcampID uint, stackName string) error {
	if err := db.Where("bootcamp_id=? AND stack_name=?", bootcampID, stackName).Preload("AssignmentFiles").Preload("StudentSubmission"); err != nil {
		return errors.New("error finding the stacks")
	}
	return nil
}

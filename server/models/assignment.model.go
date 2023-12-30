package models

import (
	"errors"

	"gorm.io/gorm"
)

type Assignment struct {
	gorm.Model
	Description       string `json:"description" gorm:"not null;size:255"`
	MentorId          uint
	StackId           uint
	BootcampId        uint
	AssignmentFiles   []*AssignmentFile    `json:"files"`
	StudentSubmission []*StudentSubmission //
}

func (a *Assignment) GetAllAssignments(db *gorm.DB) ([]Assignment, error) {
	var assignments []Assignment

	if err := db.Preload("Bootcamp").Preload("Mentor").Preload("Stack").Preload("AssignmentFiles").Find(&assignments).Error; err != nil {
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

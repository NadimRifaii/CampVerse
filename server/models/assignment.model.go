package models

import "gorm.io/gorm"

type Assignment struct {
	gorm.Model
	Description     string `json:"fileDescription" gorm:"not null;size:255"`
	MentorId        uint
	Mentor          Mentor
	StackId         uint
	Stack           Stack
	BootcampId      uint
	Bootcamp        Bootcamp
	AssignmentFiles []*AssignmentFile
}

func (a *Assignment) GetAllAssignments(db *gorm.DB) ([]Assignment, error) {
	var assignments []Assignment

	if err := db.Preload("Bootcamp").Preload("Mentor").Preload("Stack").Find(&assignments).Error; err != nil {
		return nil, err
	}
	/*
		Preload method to eager load the associated Bootcamp, Mentor, and Stack for each assignment
	*/
	return assignments, nil
}

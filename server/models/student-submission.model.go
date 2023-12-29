package models

import "gorm.io/gorm"

type StudentSubmission struct {
	gorm.Model
	Title       string `json:"title" gorm:"not null;size:255"`
	Description string `json:"description" gorm:"not null;size:255"`
	StudentId   uint
	Student     Student
	StackId     uint
	Stack       Stack
	BootcampId  uint
	Bootcamp    Bootcamp
}

func (studentSubmission *StudentSubmission) GetAllSubmissions(db *gorm.DB) ([]StudentSubmission, error) {
	var submissions []StudentSubmission

	if err := db.Preload("Bootcamp").Preload("Student").Preload("Stack").Find(&submissions).Error; err != nil {
		return nil, err
	}
	/*
		Preload method to eager load the associated Bootcamp, Mentor, and Stack for each assignment
	*/
	return submissions, nil
}

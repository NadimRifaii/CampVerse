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

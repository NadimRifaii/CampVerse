package models

import "gorm.io/gorm"

type SubmissionFile struct {
	gorm.Model
	Description  string `json:"fileDescription" gorm:"not null;size:255"`
	StudentId    uint
	Student      Student
	StackId      uint
	Stack        Stack
	BootcampId   uint
	Bootcamp     Bootcamp
	AssignmentId uint
	Assignment   Assignment
}

package models

import "gorm.io/gorm"

type StudentSubmission struct {
	gorm.Model
	StackId        uint
	Stack          Stack
	StudentId      uint
	Student        Student
	AssignmentId   uint
	Assignment     Assignment
	SubmissionFile []*SubmissionFile `json:"files"`
}

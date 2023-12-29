package models

import "gorm.io/gorm"

type AssignmentFile struct {
	gorm.Model
	Description string `json:"fileDescription" gorm:"not null;size:255"`
	MentorId    uint
	Mentor      Mentor
	StackId     uint
	Stack       Stack
	BootcampId  uint
	Bootcamp    Bootcamp
}

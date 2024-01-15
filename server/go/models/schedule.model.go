package models

import (
	"gorm.io/gorm"
)

type Schedule struct {
	ID          uint `gorm:"primarykey"`
	BootcampID  uint
	InitialDate string `json:"initialDate"`
}

/*
	schedule
	mentor has many events
	events can have many mentors

*/

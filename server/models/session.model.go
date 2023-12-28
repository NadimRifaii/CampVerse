package models

import (
	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	SessionTitle string `json:"title" gorm:"not null;size:255"`
	StartTime    string `json:"startTime" gorm:"not null;size:255"`
	EndTime      string `json:"endTime" gorm:"not null;size:255"`
	DayId        uint
	Day          Day
}

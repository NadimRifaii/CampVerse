package models

import "gorm.io/gorm"

type Day struct {
	gorm.Model
	Day        string `json:"day" gorm:"not null;default:'monday';size:255"`
	ScheduleId uint
	Schedule   Schedule
	Session    []*Session
}

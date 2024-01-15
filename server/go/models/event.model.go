package models

import "gorm.io/gorm"

type Event struct {
	Model     gorm.Model
	StartDate string    `json:"startDate"`
	EndDate   string    `json:"endDate"`
	Mentor    []*Mentor `gorm:"many2many:schedule_events"`
}

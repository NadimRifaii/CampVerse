package models

import (
	"gorm.io/gorm"
)

type Day struct {
	gorm.Model
	Day        string `json:"day" gorm:"not null;default:'monday';size:255"`
	ScheduleId uint
	Sessions   []*Session `gorm:"foreignKey:DayId"`
}

func (day *Day) GetDaySessions(db *gorm.DB) error {
	if err := db.Model(day).Association("Sessions").Find(&day.Sessions); err != nil {
		return err
	}
	return nil
}

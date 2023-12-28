package models

import (
	"errors"

	"gorm.io/gorm"
)

type Schedule struct {
	gorm.Model
	Week string `json:"week" gorm:"not null;size:255;unique"`
	Days []*Day
}

func (schedule *Schedule) GetScheduleByWeek(db *gorm.DB, week string) error {
	if db.Find(schedule, "name = ?", week); schedule.ID == 0 {
		return errors.New("Bootcamp doesn't exist")
	}
	return nil
}
func (schedule *Schedule) GetScheduleDays(db *gorm.DB) error {
	return db.Model(schedule).Association("Day").Find(schedule.Days)
}

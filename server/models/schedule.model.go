package models

import (
	"errors"

	"gorm.io/gorm"
)

type Schedule struct {
	gorm.Model
	Week string `json:"week" gorm:"not null;size:255;unique"`
	Days []*Day `gorm:"foreignKey:ScheduleId"`
}

func (schedule *Schedule) GetScheduleByWeek(db *gorm.DB) error {
	if db.Find(schedule, "week = ?", schedule.Week); schedule.ID == 0 {
		return errors.New("Bootcamp doesn't exist")
	}
	return nil
}
func (schedule *Schedule) GetScheduleDays(db *gorm.DB) error {
	if err := db.Model(schedule).Association("Days").Find(&schedule.Days); err != nil {
		return err
	}
	return nil
}

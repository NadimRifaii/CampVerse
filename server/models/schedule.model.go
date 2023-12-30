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
type Day struct {
	gorm.Model
	Day        string `json:"day" gorm:"not null;default:'monday';size:255"`
	ScheduleId uint
	Sessions   []*Session `gorm:"foreignKey:DayId"`
}

type Session struct {
	gorm.Model
	SessionTitle string `json:"title" gorm:"not null;size:255"`
	StartTime    string `json:"startTime" gorm:"not null;size:255"`
	EndTime      string `json:"endTime" gorm:"not null;size:255"`
	DayId        uint
}

func (day *Day) GetDaySessions(db *gorm.DB) error {
	if err := db.Model(day).Association("Sessions").Find(&day.Sessions); err != nil {
		return err
	}
	return nil
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

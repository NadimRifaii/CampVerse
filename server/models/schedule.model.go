package models

import (
	"errors"

	"gorm.io/gorm"
)

type Schedule struct {
	ID         uint `gorm:"primarykey"`
	BootcampID uint
	Week       string `json:"week" gorm:"not null;size:255;unique"`
	Days       []*Day `gorm:"foreignKey:ScheduleId"`
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

func GetBootcampSchedules(db *gorm.DB, bootcampID uint) ([]Schedule, error) {
	var schedules []Schedule
	result := db.Preload("Days.Sessions").Where("bootcamp_id = ?", bootcampID).Find(&schedules)
	if result.Error != nil {
		return nil, result.Error
	}
	return schedules, nil
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

/*
a mentor can give many sessions
a session can be given by many mentors
*/
type CleanedSchedule struct {
	Week       string       `json:"week"`
	BootcampID uint         `json:"bootcampID"`
	Days       []CleanedDay `json:"days"`
}

type CleanedDay struct {
	Day      string           `json:"day"`
	Sessions []CleanedSession `json:"sessions"`
}

type CleanedSession struct {
	Title     string `json:"title"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
}

func CleanSchedulesData(schedules []Schedule) []CleanedSchedule {
	var cleanedSchedules []CleanedSchedule

	for _, schedule := range schedules {
		cleanedSchedule := CleanedSchedule{
			Week:       schedule.Week,
			BootcampID: schedule.BootcampID,
			Days:       make([]CleanedDay, len(schedule.Days)),
		}

		for i, day := range schedule.Days {
			cleanedDay := CleanedDay{
				Day:      day.Day,
				Sessions: make([]CleanedSession, len(day.Sessions)),
			}

			for j, session := range day.Sessions {
				cleanedSession := CleanedSession{
					Title:     session.SessionTitle,
					StartTime: session.StartTime,
					EndTime:   session.EndTime,
				}
				cleanedDay.Sessions[j] = cleanedSession
			}

			cleanedSchedule.Days[i] = cleanedDay
		}

		cleanedSchedules = append(cleanedSchedules, cleanedSchedule)
	}

	return cleanedSchedules
}

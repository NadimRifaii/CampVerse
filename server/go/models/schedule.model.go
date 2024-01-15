package models

import (
	"errors"

	"gorm.io/gorm"
)

type Schedule struct {
	gorm.Model
	BootcampID  uint   `json:"bootcampId"`
	InitialDate string `json:"initialDate"`
	Bootcamp    Bootcamp
	Sessions    []*Session `json:"sessions"`
}

func (schedule *Schedule) GetScheduleWithSessionsAndUsers(db *gorm.DB, id uint) error {
	if err := db.First(schedule, id).Error; err != nil {
		return errors.New("schedule wasn't found")
	}
	if err := db.Preload("Sessions").Preload("Sessions.User").First(schedule, schedule.ID).Error; err != nil {
		return err
	}

	return nil
}

func (schedule *Schedule) GetSchedulesWithSessionsAndUsersByBootcampID(db *gorm.DB, bootcampID uint) ([]Schedule, error) {
	var schedules []Schedule
	if err := db.Preload("Sessions").Preload("Sessions.User").Where("bootcamp_id = ?", bootcampID).Find(&schedules).Error; err != nil {
		return nil, err
	}

	return schedules, nil
}

type CleanedSchedule struct {
	ID          uint             `json:"ID"`
	InitialDate string           `json:"initialDate"`
	BootcampID  uint             `json:"bootcampId"`
	Bootcamp    Bootcamp         `json:"Bootcamp"`
	Sessions    []CleanedSession `json:"sessions"`
}

// CleanedSession represents the cleaned session structure.
type CleanedSession struct {
	ID        uint          `json:"ID"`
	Title     string        `json:"title"`
	StartDate string        `json:"startDate"`
	EndDate   string        `json:"endDate"`
	User      []CleanedUser `json:"User"`
}

// CleanedUser represents the cleaned user structure.
type CleanedUser struct {
	ID             uint   `json:"ID"`
	UserName       string `json:"username"`
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	Email          string `json:"email"`
	ProfilePicture string `json:"profilePicture"`
}

// GetCleanedScheduleWithSessionsAndUsers retrieves the schedule with cleaned sessions and users.
func (schedule *Schedule) GetCleanedScheduleWithSessionsAndUsers() (CleanedSchedule, error) {
	var cleanedSchedule CleanedSchedule

	cleanedSchedule.ID = schedule.ID
	cleanedSchedule.BootcampID = schedule.BootcampID
	cleanedSchedule.InitialDate = schedule.InitialDate

	cleanedSchedule.Bootcamp.ID = schedule.Bootcamp.ID
	cleanedSchedule.Bootcamp.Name = schedule.Bootcamp.Name
	cleanedSchedule.Bootcamp.LearningOutcomes = schedule.Bootcamp.LearningOutcomes
	cleanedSchedule.Bootcamp.LearningOutcomes = schedule.Bootcamp.TargetAudiance
	cleanedSchedule.Bootcamp.NumberOfWeeks = schedule.Bootcamp.NumberOfWeeks

	for _, session := range schedule.Sessions {
		cleanedSession := CleanedSession{
			ID:        session.ID,
			Title:     session.Title,
			StartDate: session.StartDate,
			EndDate:   session.EndDate,
		}

		for _, user := range session.User {
			cleanedUser := CleanedUser{
				ID:             user.ID,
				UserName:       user.UserName,
				FirstName:      user.FirstName,
				LastName:       user.LastName,
				Email:          user.Email,
				ProfilePicture: user.ProfilePicture,
			}

			cleanedSession.User = append(cleanedSession.User, cleanedUser)
		}

		cleanedSchedule.Sessions = append(cleanedSchedule.Sessions, cleanedSession)
	}

	return cleanedSchedule, nil
}

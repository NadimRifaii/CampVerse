package models

import (
	"errors"

	"gorm.io/gorm"
)

type Mentor struct {
	gorm.Model
	Speciality string `json:"speciality" gorm:"not null;default:'x';size:255"`
	Position   string `json:"position" gorm:"not null;default:'x';size:255"`
	UserId     uint
	User       User
	Stack      []*Stack `gorm:"many2many:teaches;"`
}

func (mentor *Mentor) GetMentorByID(db *gorm.DB, id string) error {
	if db.Find(mentor, id); mentor.ID == 0 {
		return errors.New("Bootcamp was not found")
	}
	return nil
}

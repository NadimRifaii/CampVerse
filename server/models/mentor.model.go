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
func (mentor *Mentor) AddStackToMentor(db *gorm.DB, stack *Stack) error {
	var existingStack Stack
	if db.Model(mentor).Association("Stack").Find(&existingStack, "id = ?", stack.ID); existingStack.ID != 0 {
		return errors.New("teacher already teaches this stack")
	}
	mentor.Stack = append(mentor.Stack, stack)
	if err := db.Save(mentor).Error; err != nil {
		return err
	}

	return nil
}

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

func (mentor *Mentor) GetMentorByID(db *gorm.DB, id uint) error {
	if db.Find(mentor, "user_id=?", id); mentor.ID == 0 {
		return errors.New("mentor was not found")
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
func (mentor *Mentor) RemoveStackFromMentor(db *gorm.DB, stack *Stack) error {
	// Check if the user is associated with the bootcamp
	var existingStack Stack
	if db.Model(mentor).Association("Stack").Find(&existingStack, "id = ?", stack.ID); existingStack.ID == 0 {
		return errors.New("Mentor doesn't teach this stack")
	}
	// Remove the user from the bootcamp
	if err := db.Model(mentor).Association("Stack").Delete(stack); err != nil {
		return err
	}

	return nil
}
func (mentor *Mentor) UpdateMentor(db *gorm.DB) error {
	return db.Save(mentor).Error
}

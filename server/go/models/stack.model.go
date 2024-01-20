package models

import (
	"errors"
	"gorm.io/gorm"
)

type Stack struct {
	ID        uint        `gorm:"primarykey"`
	Name      string      `json:"name" gorm:"not null;default:'x';size:255"`
	Bootcamps []*Bootcamp `gorm:"many2many:bootcamp_stack"`
	Grade     []*Grade
	Mentors   []*Mentor `gorm:"many2many:teaches;"`
}

func (stack *Stack) GetStacks(db *gorm.DB) ([]Stack, error) {
	var stacks []Stack
	if err := db.Find(&stacks).Error; err != nil {
		return nil, err
	}
	return stacks, nil
}

func (stack *Stack) GetStackById(db *gorm.DB, id uint) error {
	if db.Find(stack, "id = ?", id); stack.ID == 0 {
		return errors.New("Stack not found")
	}
	return nil
}

func (stack *Stack) GetStackByName(db *gorm.DB, name string) error {
	if db.Find(stack, "name = ?", name); stack.ID == 0 {
		return errors.New("Stack not found")
	}
	return nil
}

package models

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Stack struct {
	gorm.Model
	Name     string      `json:"name" gorm:"not null;default:'x';size:255;unique"`
	Bootcamp []*Bootcamp `gorm:"many2many:bootcamp_stack"`
	Mentor   []*Mentor   `gorm:"many2many:teaches;"`
}

func (stack *Stack) GetStacks(db *gorm.DB) ([]Stack, error) {
	var stacks []Stack
	fmt.Println("stacks")
	if err := db.Find(&stacks).Error; err != nil {
		return nil, err
	}
	return stacks, nil
}
func (stack *Stack) GetStackByName(db *gorm.DB, name string) error {
	if db.Find(stack, "name = ?", name); stack.ID == 0 {
		return errors.New("Stack not found")
	}
	return nil
}

package models

import "gorm.io/gorm"

type Stack struct {
	gorm.Model
	Name string `json:"name" gorm:"not null;default:'x';size:255;unique"`
}

func (stack *Stack) GetStacks(db *gorm.DB) ([]Stack, error) {
	var stacks []Stack
	if err := db.Find(stack).Error; err != nil {
		return nil, err
	}
	return stacks, nil
}

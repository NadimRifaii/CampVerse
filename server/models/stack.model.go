package models

import "gorm.io/gorm"

type Stack struct {
	gorm.Model
	Name string `json:"name" gorm:"not null;default:'x';size:255;unique"`
}

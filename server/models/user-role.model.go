package models

import "gorm.io/gorm"

type UserRole struct {
	gorm.Model
	RoleName string `json:"role" gorm:"not null;default:'user';size:255" `
}

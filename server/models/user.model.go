package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username     string `json:"username" gorm:"not null;default:'first';size:255"`
	Lastname     string `json:"lastname" gorm:"not null;default:'last';size:255"`
	Email        string `json:"email" gorm:"not null;size:255;unique"`
	PasswordHash string `json:"password" gorm:"not null;size:255"`
	RoleID       uint   // Foreign key to the UserRoles table
	UserRole     UserRole
}

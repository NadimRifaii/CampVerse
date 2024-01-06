package models

import (
	"errors"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string `json:"username" gorm:"not null;default:'first';size:255"`
	Lastname  string `json:"lastname" gorm:"not null;default:'last';size:255"`
	Email     string `json:"email" gorm:"not null;size:255;unique"`
	Password  string `json:"password" gorm:"not null;size:255"`
	Image_url string `json:"profile_picture" gorm:"default:'default_profile_picture.jpg'"`
	RoleID    uint
	UserRole  UserRole    `gorm:"foreignKey:RoleID"`
	Bootcamp  []*Bootcamp `gorm:"many2many:bootcamp_users;"`
}

func (user *User) GetUserById(id string, db *gorm.DB) error {
	if db.Find(user, "id = ?", id); user.ID == 0 {
		return errors.New("User not found")
	}
	return nil
}
func (user *User) GetUserByEmail(email string, db *gorm.DB) error {
	if db.Find(user, "email = ?", email); user.ID == 0 {
		return errors.New("User not found")
	}
	return nil
}
func (user *User) GetUserBootcamps(db *gorm.DB) ([]Bootcamp, error) {
	var bootcamps []Bootcamp
	if err := db.Model(&user).Association("Bootcamp").Find(&bootcamps); err != nil {
		return nil, err
	}
	return bootcamps, nil
}

//

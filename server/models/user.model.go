package models

import (
	"errors"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username       string `json:"username" gorm:"not null;default:'username';size:255"`
	FirstName      string `json:"firstname" gorm:"not null;default:'first';size:255"`
	Lastname       string `json:"lastname" gorm:"not null;default:'last';size:255"`
	Email          string `json:"email" gorm:"not null;size:255;unique"`
	Password       string `json:"password" gorm:"not null;size:255"`
	ProfilePicture string `json:"profilePicture" gorm:"default:'default_profile_picture.jpg'"`
	RoleID         uint
	UserRole       UserRole    `gorm:"foreignKey:RoleID"`
	Bootcamp       []*Bootcamp `gorm:"many2many:bootcamp_users;"`
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

func (user *User) UpdateUser(db *gorm.DB) error {
	return db.Save(user).Error
}
func (user *User) GetAllUsers(db *gorm.DB) ([]User, error) {
	var users []User
	if err := db.Preload("UserRole").Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (user *User) GetAllMentorUsers(db *gorm.DB) ([]User, error) {
	var mentors []User
	if err := db.Preload("UserRole").Where("role_id = ?", 3).Find(&mentors).Error; err != nil {
		return nil, err
	}
	return mentors, nil
}
func (user *User) GetAllStudentUsers(db *gorm.DB) ([]User, error) {
	var mentors []User
	if err := db.Preload("UserRole").Where("role_id = ?", 2).Find(&mentors).Error; err != nil {
		return nil, err
	}
	return mentors, nil
}

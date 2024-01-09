package models

import (
	"errors"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName       string `json:"username" gorm:"not null;default:'username';size:255;"`
	FirstName      string `json:"firstname" gorm:"not null;default:'first';size:255;"`
	LastName       string `json:"lastname" gorm:"not null;default:'last';size:255;"`
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
	if db.Preload("UserRole").Find(user, "email = ?", email); user.ID == 0 {
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

func (user *User) GetAllUsers(db *gorm.DB) ([]Response, error) {
	var users []User
	if err := db.Preload("UserRole").Find(&users).Error; err != nil {
		return nil, err
	}
	var cleanedUsers []Response
	for _, user := range users {
		cleanedUser := Response{
			ID:             user.ID,
			UserName:       user.UserName,
			FirstName:      user.FirstName,
			LastName:       user.LastName,
			Email:          user.Email,
			Role:           user.UserRole.RoleName,
			ProfilePicture: user.ProfilePicture,
		}
		cleanedUser.Speciality = ""
		cleanedUser.Position = ""
		cleanedUsers = append(cleanedUsers, cleanedUser)
	}
	return cleanedUsers, nil
}

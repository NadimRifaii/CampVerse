package models

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Bootcamp struct {
	gorm.Model
	Name             string  `json:"name" gorm:"not null;default:'first';size:255;unique"`
	LearningOutcomes string  `json:"outcomes" gorm:"not null;"`
	TargetAudiance   string  `json:"audience" gorm:"not null;;size:255"`
	User             []*User `gorm:"many2many:bootcamp_users;"`
}

func (bootcamp *Bootcamp) GetBootcampByID(db *gorm.DB, id string) error {
	if db.Find(bootcamp, id); bootcamp.ID == 0 {
		return errors.New("Bootcamp was not found")
	}
	fmt.Println(bootcamp)
	return nil
}
func (bootcamp *Bootcamp) GetAllBootcamps(db *gorm.DB) ([]Bootcamp, error) {
	var bootcamps []Bootcamp
	if err := db.Find(&bootcamps).Error; err != nil {
		return nil, err
	}
	return bootcamps, nil
}
func (bootcamp *Bootcamp) GetBootcampByName(db *gorm.DB, name string) error {
	if db.Find(bootcamp, "name = ?", name); bootcamp.ID == 0 {
		return errors.New("Bootcamp doesn't exist")
	}
	return nil
}

func (bootcamp *Bootcamp) GetUsersInBootcamp(db *gorm.DB) ([]User, error) {
	var users []User
	if err := db.Model(&bootcamp).Association("User").Find(&users); err != nil {
		return nil, err
	}
	return users, nil
}
func (bootcamp *Bootcamp) AddUserToBootcamp(db *gorm.DB, user *User) error {
	var existingUser User
	if db.Model(bootcamp).Association("User").Find(&existingUser, "id = ?", user.ID); existingUser.ID != 0 {
		fmt.Println(existingUser.ID)
		return errors.New("User already exist in this bootcamp")
	}
	bootcamp.User = append(bootcamp.User, user)
	if err := db.Save(bootcamp).Error; err != nil {
		return err
	}

	return nil
}

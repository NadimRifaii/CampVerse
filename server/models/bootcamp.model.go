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

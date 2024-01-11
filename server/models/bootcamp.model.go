package models

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type Bootcamp struct {
	ID               uint     `gorm:"primarykey"`
	Name             string   `json:"name" gorm:"not null;default:'first';size:255;unique"`
	LearningOutcomes string   `json:"outcomes" gorm:"not null;"`
	TargetAudiance   string   `json:"audience" gorm:"not null;;size:255"`
	Users            []*User  `gorm:"many2many:bootcamp_users;"`
	Stacks           []*Stack `gorm:"many2many:bootcamp_stack"`
}
type BootcampDetails struct {
	Name             string     `json:"name"`
	LearningOutcomes string     `json:"outcomes"`
	TargetAudience   string     `json:"audience"`
	Mentors          []Response `json:"mentors"`
	Students         []Response `json:"students"`
}

func (bootcamp *Bootcamp) GetAllBootcampsWithCleanedData(db *gorm.DB) ([]BootcampDetails, error) {
	var bootcamps []Bootcamp
	if err := db.Preload("Stacks").Preload("Users").Preload("Users.UserRole").Find(&bootcamps).Error; err != nil {
		return nil, err
	}
	var bootcampDetailsList []BootcampDetails
	for _, bootcamp := range bootcamps {
		var mentors []Response
		var students []Response

		for _, user := range bootcamp.Users {
			cleanedUser := Response{
				ID:             user.ID,
				UserName:       user.UserName,
				FirstName:      user.FirstName,
				LastName:       user.LastName,
				Email:          user.Email,
				Role:           user.UserRole.RoleName,
				ProfilePicture: user.ProfilePicture,
			}

			if cleanedUser.Role == "mentor" {
				mentor := new(Mentor)
				mentor.GetMentorByID(db, cleanedUser.ID)
				cleanedUser.Speciality = mentor.Speciality
				cleanedUser.Position = mentor.Position
				mentors = append(mentors, cleanedUser)
			} else {
				cleanedUser.Speciality = ""
				cleanedUser.Position = ""
				students = append(students, cleanedUser)
			}
		}
		bootcampDetails := BootcampDetails{
			Name:             bootcamp.Name,
			LearningOutcomes: bootcamp.LearningOutcomes,
			TargetAudience:   bootcamp.TargetAudiance,
			Mentors:          mentors,
			Students:         students,
		}

		bootcampDetailsList = append(bootcampDetailsList, bootcampDetails)
	}

	return bootcampDetailsList, nil
}
func (bootcamp *Bootcamp) GetBootcampByID(db *gorm.DB, id uint) error {
	fmt.Println(id)
	if err := db.Preload("Stacks").Preload("Users").Find(bootcamp, id).Error; err != nil {
		return errors.New("Bootcamp was not found")
	}
	return nil
}
func (bootcamp *Bootcamp) GetAllBootcamps(db *gorm.DB) ([]Bootcamp, error) {
	var bootcamps []Bootcamp
	if err := db.Preload("Stacks").Preload("Users").Find(&bootcamps).Error; err != nil {
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
	if err := db.Model(bootcamp).Association("User").Find(&users); err != nil {
		return nil, err
	}
	return users, nil
}

func (bootcamp *Bootcamp) GetStacksInBootcamp(db *gorm.DB) ([]Stack, error) {
	var stacks []Stack
	if err := db.Model(bootcamp).Association("Stack").Find(&stacks); err != nil {
		return nil, err
	}
	return stacks, nil
}

func (bootcamp *Bootcamp) AddUserToBootcamp(db *gorm.DB, user *User) error {
	var existingUser User
	if db.Model(bootcamp).Association("Users").Find(&existingUser, "id = ?", user.ID); existingUser.ID != 0 {
		return errors.New("User already exist in this bootcamp")
	}
	bootcamp.Users = append(bootcamp.Users, user)
	if err := db.Save(bootcamp).Error; err != nil {
		return err
	}

	return nil
}

func (bootcamp *Bootcamp) AddStackToBootcamp(db *gorm.DB, stack *Stack) error {
	var existingStack Stack
	if db.Model(bootcamp).Association("Stacks").Find(&existingStack, "id = ?", stack.ID); existingStack.ID != 0 {
		return errors.New("Stack already exist in this bootcacmp")
	}
	bootcamp.Stacks = append(bootcamp.Stacks, stack)
	if err := db.Save(bootcamp).Error; err != nil {
		return err
	}
	return nil
}

func (bootcamp *Bootcamp) RemoveUserFromBootcamp(db *gorm.DB, user *User) error {
	// Check if the user is associated with the bootcamp
	var existingUser User
	if db.Model(bootcamp).Association("User").Find(&existingUser, "id = ?", user.ID); existingUser.ID == 0 {
		return errors.New("User not found in this bootcamp")
	}

	// Remove the user from the bootcamp
	if err := db.Model(bootcamp).Association("User").Delete(user); err != nil {
		return err
	}

	return nil
}

func (bootcamp *Bootcamp) RemoveStackFromBootcamp(db *gorm.DB, stack *Stack) error {
	var existingStack Stack
	if db.Model(bootcamp).Association("Stack").Find(&existingStack, "id=?", stack.ID); existingStack.ID == 0 {
		return errors.New("Stack not found in this bootcamp")
	}
	if err := db.Model(bootcamp).Association("Stack").Delete(stack); err != nil {
		return err
	}
	return nil
}

package models

import (
	"errors"
	"fmt"

	"gorm.io/gorm"
)

type User struct {
	ID             uint   `gorm:"primarykey"`
	UserName       string `json:"username" gorm:"not null;default:'username';size:255;"`
	FirstName      string `json:"firstname" gorm:"not null;default:'first';size:255;"`
	LastName       string `json:"lastname" gorm:"not null;default:'last';size:255;"`
	Email          string `json:"email" gorm:"not null;size:255;unique"`
	Password       string `json:"password" gorm:"not null;size:255"`
	ProfilePicture string `json:"profilePicture" gorm:"default:'default_profile_picture.jpg'"`
	RoleID         uint
	UserRole       UserRole    `gorm:"foreignKey:RoleID"`
	Session        []*Session  `gorm:"many2many:user_sessions"`
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

func (user *User) UpdateUser(db *gorm.DB, newRole string) error {
	if user.UserRole.RoleName != newRole {
		fmt.Println(user.UserRole.RoleName)
		user.UpdateUserRoleByEmail(db, user.Email, newRole)
	}
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
		if cleanedUser.Role == "mentor" {
			mentor := new(Mentor)
			mentor.GetMentorByID(db, cleanedUser.ID)
			cleanedUser.Speciality = mentor.Speciality
			cleanedUser.Position = mentor.Position
		} else {
			cleanedUser.Speciality = ""
			cleanedUser.Position = ""
		}
		cleanedUsers = append(cleanedUsers, cleanedUser)
	}
	return cleanedUsers, nil
}
func (user *User) UpdateUserRoleByEmail(db *gorm.DB, email string, newRoleName string) error {
	if err := user.GetUserByEmail(email, db); err != nil {
		return err
	}
	switch user.UserRole.RoleName {
	case "student":
		student := new(Student)
		if err := student.GetStudentByID(db, user.ID); err != nil {
			return err
		}
		if err := student.DeleteStudent(db); err != nil {
			return err
		}
		mentor := new(Mentor)
		mentor.UserId = user.ID
		db.Create(mentor)
	case "mentor":
		mentor := new(Mentor)
		if err := mentor.GetMentorByID(db, user.ID); err != nil {
			return err
		}
		if err := mentor.DeleteMentor(db); err != nil {
			return err
		}
		student := new(Student)
		student.UserId = user.ID
		db.Create(student)
	}
	newRole := new(UserRole)
	if err := newRole.GetRoleByName(db, newRoleName); err != nil {
		return err
	}
	// Update the UserRole association
	user.UserRole = *newRole
	if err := db.Save(user).Error; err != nil {
		return err
	}
	return nil
}

func (u *User) DeleteUser(db *gorm.DB) error {
	if u.UserRole.RoleName == "student" {
		student := new(Student)
		if err := student.GetStudentByID(db, u.ID); err != nil {
			return err
		}
		student.DeleteStudent(db)
	} else {
		mentor := new(Mentor)
		if err := mentor.GetMentorByID(db, u.ID); err != nil {
			return err
		}
		mentor.DeleteMentor(db)
	}
	result := db.Delete(u)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (u *User) GetAllBootcampsWithCleanedData(db *gorm.DB) ([]BootcampDetails, error) {
	var bootcampDetailsList []BootcampDetails

	// Fetch the user with associated bootcamps and related data
	if err := db.Preload("Bootcamp").Preload("Bootcamp.Stacks").Preload("Bootcamp.Weeks").Preload("Bootcamp.Users.UserRole").Where("id = ?", u.ID).Find(u).Error; err != nil {
		return nil, err
	}

	for _, bootcamp := range u.Bootcamp {
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
			ID:               bootcamp.ID,
			Name:             bootcamp.Name,
			LearningOutcomes: bootcamp.LearningOutcomes,
			TargetAudience:   bootcamp.TargetAudiance,
			NumberOfWeeks:    bootcamp.NumberOfWeeks,
			Mentors:          mentors,
			Students:         students,
			Weeks:            bootcamp.Weeks,
		}

		bootcampDetailsList = append(bootcampDetailsList, bootcampDetails)
	}

	return bootcampDetailsList, nil
}

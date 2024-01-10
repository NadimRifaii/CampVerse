package models

import (
	"errors"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	UserId             uint
	User               User
	StudentSubmissions []*StudentSubmission
}

func (student *Student) GetStudentByID(db *gorm.DB, id uint) error {
	if db.Find(student, "user_id=?", id); student.ID == 0 {
		return errors.New("student was not found")
	}
	return nil
}
func (s *Student) GetStudentSubmissions(db *gorm.DB) ([]*StudentSubmission, error) {
	var submissions []*StudentSubmission
	if err := db.Where("student_id = ?", s.ID).Preload("SubmissionFiles").Find(&submissions).Error; err != nil {
		return nil, err
	}
	return submissions, nil
}
func (user *User) GetAllStudentUsers(db *gorm.DB) ([]Response, error) {
	var students []Student
	if err := db.Preload("User").Preload("User.UserRole").Find(&students).Error; err != nil {
		return nil, err
	}
	var cleanedStudents []Response
	for _, student := range students {
		cleanedStudent := Response{
			ID:             student.ID,
			UserName:       student.User.UserName,
			FirstName:      student.User.FirstName,
			LastName:       student.User.LastName,
			Email:          student.User.Email,
			Role:           student.User.UserRole.RoleName,
			ProfilePicture: student.User.ProfilePicture,
		}
		cleanedStudent.Speciality = ""
		cleanedStudent.Position = ""
		cleanedStudents = append(cleanedStudents, cleanedStudent)
	}
	return cleanedStudents, nil
}
func (s *Student) DeleteStudent(db *gorm.DB) error {
	result := db.Delete(s)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

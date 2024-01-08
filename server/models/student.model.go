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

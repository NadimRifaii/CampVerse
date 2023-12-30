package models

import (
	"errors"

	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	UserId            uint
	User              User
	SubmissionFile    []*SubmissionFile
	StudentSubmission []*StudentSubmission
}

func (student *Student) GetStudentByID(db *gorm.DB, id uint) error {
	if db.Find(student, "user_id=?", id); student.ID == 0 {
		return errors.New("student was not found")
	}
	return nil
}

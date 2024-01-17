package models

import (
	"errors"

	"gorm.io/gorm"
)

type StudentSubmission struct {
	ID              uint       `gorm:"primarykey"`
	StackId         uint       `gorm:"foreignkey:StackId"`
	StudentId       uint       `gorm:"foreignkey:StudentId"`
	AssignmentId    uint       `gorm:"foreignkey:AssignmentId"`
	Assignment      Assignment `json:"assignment"`
	SubmitedAt      string     `json:"submitedAt" gorm:"size:255"`
	SubmissionFiles []*SubmissionFile
}
type SubmissionFile struct {
	gorm.Model
	FileName            string `json:"fileName" gorm:"not null;size:255"`
	FileType            string `json:"fileType" gorm:"not null;size:255"`
	FileUrl             string `json:"fileUrl" gorm:"not null;size:255"`
	StudentSubmissionId uint   `gorm:"foreignKey:StudentSubmissionId"`
}

func (submission *StudentSubmission) CreateSubmission(db *gorm.DB) error {
	var existingSubmission StudentSubmission
	if db.First(&existingSubmission, "stack_id = ? AND student_id = ? AND assignment_id = ?", submission.StackId, submission.StudentId, submission.AssignmentId); existingSubmission.ID != 0 {
		return errors.New("submission already exists for the given Stack, Student, and Assignment")
	}
	if err := db.Create(submission).Error; err != nil {
		return err
	}

	return nil
}

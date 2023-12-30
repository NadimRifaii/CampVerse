package models

import (
	"errors"

	"gorm.io/gorm"
)

type StudentSubmission struct {
	gorm.Model
	StackId         uint
	Stack           Stack
	StudentId       uint
	Student         Student
	AssignmentId    uint
	Assignment      Assignment
	SubmissionFiles []*SubmissionFile
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
func (student *Student) GetSubmittedFiles(db *gorm.DB) ([]*SubmissionFile, error) {
	var submittedFiles []*SubmissionFile

	if err := db.Model(student).Association("StudentSubmissions.SubmissionFiles").Find(&submittedFiles); err != nil {
		return nil, err
	}

	return submittedFiles, nil
}

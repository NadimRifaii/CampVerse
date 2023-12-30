package models

import "gorm.io/gorm"

type Student struct {
	gorm.Model
	UserId            uint
	User              User
	SubmissionFile    []*SubmissionFile
	StudentSubmission []*StudentSubmission
}

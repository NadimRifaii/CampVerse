package models

import "gorm.io/gorm"

type Student struct {
	gorm.Model
	UserId            uint
	User              User
	StudentSubmission []*StudentSubmission
}

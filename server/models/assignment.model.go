package models

import "gorm.io/gorm"

type Assignment struct {
	gorm.Model
	FileName string `json:"fileName" gorm:"not null;size:255;unique"`
	FileType string `json:"fileType" gorm:"default:'pdf';size:255;unique"`
	FileUrl  string `json:"fileUrl" gorm:"not null;size:255;unique"`
	MentorId uint
	Mentor   Mentor
}

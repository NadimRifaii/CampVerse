package models

import "gorm.io/gorm"

type AssignmentFile struct {
	gorm.Model
	FileName     string `json:"fileName" gorm:"not null;size:255;unique"`
	FileType     string `json:"fileType" gorm:"default:'pdf';size:255"`
	FileUrl      string `json:"fileUrl" gorm:"not null;size:255;"`
	AssignmentId uint
	Assignment   Assignment
}

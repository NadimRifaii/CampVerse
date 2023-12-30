package models

import "gorm.io/gorm"

type SubmissionFile struct {
	gorm.Model
	FileName            string `json:"fileName" gorm:"not null;size:255"`
	FileType            string `json:"fileType" gorm:"not null;size:255"`
	FileUrl             string `json:"fileUrl" gorm:"not null;size:255"`
	StudentSubmissionId uint   `gorm:"foreignKey:StudentSubmissionId"`
}

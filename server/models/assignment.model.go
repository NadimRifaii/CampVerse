package models

import "gorm.io/gorm"

type Assignment struct {
	gorm.Model
	FileName    string `json:"fileName" gorm:"not null;size:255;unique"`
	FileType    string `json:"fileType" gorm:"default:'pdf';size:255;unique"`
	FileUrl     string `json:"fileUrl" gorm:"not null;size:255;unique"`
	Description string `json:"fileDescription" gorm:"not null;size:255"`
	MentorId    uint
	Mentor      Mentor
	StackId     uint
	Stack       Stack
	BootcampId  uint
	Bootcamp    Bootcamp
}

func (a *Assignment) GetAllAssignments(db *gorm.DB) ([]Assignment, error) {
	var assignments []Assignment

	if err := db.Preload("Bootcamp").Preload("Mentor").Preload("Stack").Find(&assignments).Error; err != nil {
		return nil, err
	}

	return assignments, nil
}

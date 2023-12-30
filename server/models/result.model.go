package models

import "gorm.io/gorm"

type Result struct {
	gorm.Model
	StudentId  uint
	BootcampId uint
	Week       string `json:"week" gorm:"unique"`
	Grade      []*Grade
}
type Grade struct {
	gorm.Model
	ResultId uint
	StackId  uint
	Grade    int    `json:"grade"`
	Badge    string `json:"badge"`
}

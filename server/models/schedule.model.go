package models

import "gorm.io/gorm"

type Schedule struct {
	gorm.Model
	Week string `json:"week" gorm:"not null;size:255;unique"`
	Day  []*Day
}

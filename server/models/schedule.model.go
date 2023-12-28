package models

import "gorm.io/gorm"

type Schedule struct {
	gorm.Model
	Day []Day
}

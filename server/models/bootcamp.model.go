package models

import "gorm.io/gorm"

type Bootcamp struct {
	gorm.Model
	Name             string `json:"name" gorm:"not null;default:'first';size:255;unique"`
	LearningOutcomes string `json:"outcomes" gorm:"not null;"`
	TargetAudiance   string `json:"audience" gorm:"not null;;size:255"`
}

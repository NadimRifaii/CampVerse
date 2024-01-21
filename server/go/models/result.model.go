package models

import (
	"errors"

	"gorm.io/gorm"
)

type Result struct {
	ID         uint `gorm:"primarykey"`
	BootcampId uint
	Week       string `json:"week"`
	Grades     []*Grade
	UserId     uint `json:"userId"`
	User       User
}

type Grade struct {
	gorm.Model
	ResultId uint
	StackId  uint
	Stack    Stack
	Grade    int    `json:"grade"`
	Badge    string `json:"badge"`
}

func (r *Result) GetAllResultsInBootcamp(db *gorm.DB, bootcampID uint) ([]Result, error) {
	var results []Result
	if err := db.Preload("User").Preload("Grades.Stack").Find(&results, "bootcamp_id = ?", bootcampID).Error; err != nil {
		return nil, err
	}
	return results, nil
}
func (r *Result) GetWeeklyResult(db *gorm.DB, week string, bootcampId uint) error {
	if db.First(r, "week = ? AND bootcamp_id = ?", week, bootcampId); r.ID == 0 {
		return errors.New("record not found")
	}
	// Eager load related grades
	db.Preload("Grades").Find(r)
	return nil
}

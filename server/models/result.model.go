package models

import (
	"errors"

	"gorm.io/gorm"
)

type Result struct {
	gorm.Model
	StudentId  uint
	BootcampId uint
	Week       string `json:"week" gorm:"unique"`
	Grades     []*Grade
}
type Grade struct {
	gorm.Model
	ResultId uint
	StackId  uint
	Grade    int    `json:"grade"`
	Badge    string `json:"badge"`
}

func (r *Result) GetAllResultsInBootcamp(db *gorm.DB, bootcampID uint) ([]Result, error) {
	var results []Result

	// Find all results in the specified bootcamp
	if err := db.Find(&results, "bootcamp_id = ?", bootcampID).Error; err != nil {
		return nil, err
	}

	// Preload grades for each result
	for i := range results {
		db.Model(&results[i]).Association("Grades").Find(&results[i].Grades)
	}

	return results, nil
}
func (r *Result) GetWeeklyResult(db *gorm.DB, week string, bootcampId uint) (*Result, error) {
	var result Result

	if db.First(&result, "week = ? AND bootcamp_id = ?", week, bootcampId); result.ID == 0 {
		return nil, errors.New("record not found")
	}

	return &result, nil
}

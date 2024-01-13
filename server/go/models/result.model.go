package models

import (
	"errors"

	"gorm.io/gorm"
)

type Result struct {
	ID         uint `gorm:"primarykey"`
	StudentId  uint
	BootcampId uint
	Week       string `json:"week" gorm:"unique"`
	Grades     []*Grade
} //
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
func (r *Result) GetWeeklyResult(db *gorm.DB, week string, bootcampId uint) error {
	if db.First(r, "week = ? AND bootcamp_id = ?", week, bootcampId); r.ID == 0 {
		return errors.New("record not found")
	}
	// Eager load related grades
	db.Preload("Grades").Find(r)
	return nil
}
package models

import (
	"errors"

	"gorm.io/gorm"
)

type Result struct {
	ID         uint   `gorm:"primarykey"`
	BootcampID uint   `json:"bootcampId"`
	Week       string `json:"week" gorm:"unique"`
	Grades     []*Grade
} //
type Grade struct {
	gorm.Model
	ResultId  uint
	StackId   uint   `json:"stackId"`
	StudentId uint   `json:"studentId"`
	Grade     int    `json:"grade"`
	Badge     string `json:"badge"`
	User      User   `gorm:"foreignkey:StudentId"`
}

func (r *Result) GetAllResultsInBootcamp(db *gorm.DB, bootcampID uint) ([]Result, error) {
	var results []Result

	if err := db.Find(&results, "bootcamp_id = ?", bootcampID).Error; err != nil {
		return nil, err
	}

	for i := range results {
		db.Model(&results[i]).Association("Grades").Find(&results[i].Grades)
		for j := range results[i].Grades {
			var user User
			if err := db.First(&user, results[i].Grades[j].StudentId).Error; err != nil {
				return nil, err
			}
			results[i].Grades[j].User = user
		}
	}

	return results, nil
}

func (r *Result) GetWeeklyResult(db *gorm.DB, week string, bootcampId uint) error {
	if db.First(r, "week = ? AND bootcamp_id = ?", week, bootcampId); r.ID == 0 {
		return errors.New("record not found")
	}
	db.Preload("Grades").Find(r)
	return nil
}

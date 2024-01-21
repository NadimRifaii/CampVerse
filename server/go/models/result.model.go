package models

import (
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

//	func (r *Result) GetWeeklyResult(db *gorm.DB, week string, bootcampId uint) error {
//		if db.First(r, "week = ? AND bootcamp_id = ?", week, bootcampId); r.ID == 0 {
//			return errors.New("record not found")
//		}
//		db.Preload("Grades").Preload("Grades.Stack").Preload("User").Find(r)
//		return nil
//	}
func (r *Result) GetWeeklyResults(db *gorm.DB, week string, bootcampId uint) ([]*Result, error) {
	var results []*Result
	// if err := db.Where("week = ? AND bootcamp_id = ?", week, bootcampId).Find(&results).Error; err != nil {
	if err := db.Where("bootcamp_id = ?", bootcampId).Find(&results).Error; err != nil {
		return nil, err
	}
	for _, result := range results {
		db.Model(result).Preload("Grades").Preload("Grades.Stack").Preload("User").Find(result)
	}

	return results, nil
}
func GroupResultsByWeek(results []*Result) map[string][]*Result {
	groupedResults := make(map[string][]*Result)

	for _, result := range results {
		week := result.Week
		if _, ok := groupedResults[week]; !ok {
			groupedResults[week] = []*Result{result}
		} else {
			groupedResults[week] = append(groupedResults[week], result)
		}
	}

	return groupedResults
}

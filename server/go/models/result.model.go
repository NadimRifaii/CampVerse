package models

import "gorm.io/gorm"

type Week struct {
	ID         uint `gorm:"primarykey"`
	BootcampId uint `gorm:"foreignkey:BootcampId"`
	Result     []*Result
}
type Grade struct {
	ID       uint `gorm:"primarykey"`
	StackId  uint `gorm:"foreignkey:StackId"`
	Stack    Stack
	ResultId uint `gorm:"foreignkey:ResultId"`
	Score    int  `json:"score"`
}
type Result struct {
	ID     uint `gorm:"primarykey"`
	UserId uint `gorm:"foreignkey:UserId"`
	User   User
	WeekId uint     `gorm:"foreignkey:WeekId" json:"weekId"`
	Grade  []*Grade `json:"grades"`
}

func (r *Result) GetResultsByWeekID(db *gorm.DB) ([]*Result, error) {
	var results []*Result
	if err := db.Preload("User").Preload("Grade.Stack").Where("week_id = ?", r.WeekId).Find(&results).Error; err != nil {
		return nil, err
	}
	return results, nil
}

// CleanedResult struct
type CleanedResult struct {
	ID     uint           `json:"ID"`
	User   User           `json:"User"`
	WeekID uint           `json:"weekId"`
	Grades []CleanedGrade `json:"grades"`
}

// CleanedGrade struct
type CleanedGrade struct {
	StackName string `json:"stackName"`
	Score     int    `json:"score"`
}

func (r *Result) GetCleanedResultsByWeekID(db *gorm.DB) ([]CleanedResult, error) {
	var results []*Result
	if err := db.Preload("User").Preload("Grade.Stack").Where("week_id = ?", r.WeekId).Find(&results).Error; err != nil {
		return nil, err
	}

	cleanedResults := make([]CleanedResult, len(results))
	for i, res := range results {
		cleanedGrades := make([]CleanedGrade, len(res.Grade))
		for j, grade := range res.Grade {
			cleanedGrades[j] = CleanedGrade{
				StackName: grade.Stack.Name,
				Score:     grade.Score,
			}
		}

		cleanedResults[i] = CleanedResult{
			ID:     res.ID,
			User:   res.User,
			WeekID: res.WeekId,
			Grades: cleanedGrades,
		}
	}

	return cleanedResults, nil
}

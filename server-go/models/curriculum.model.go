package models

import (
	"gorm.io/gorm"
)

type Curriculum struct { //
	ID         uint `gorm:"primarykey"`
	BootcampID uint
	Title      string `json:"title" gorm:"not null;size:255;unique"`
	Bootcamp   Bootcamp
	Stack      []*Stack `json:"stacks"  gorm:"many2many:curriculum_stacks;"`
	WeekId     uint     `gorm:"foreignkey:weekId;unique" json:"weekId"`
}

func (c *Curriculum) GetCurriculumsByBootcampID(db *gorm.DB, bootcampID uint) ([]Curriculum, error) {
	var curriculums []Curriculum
	if err := db.Preload("Stack").Where("bootcamp_id = ?", bootcampID).Find(&curriculums).Error; err != nil {
		return nil, err
	}
	return curriculums, nil
}
func (c *Curriculum) GetBootcampWeekCurriculum(db *gorm.DB) error {
	if err := db.Where("week_id = ?", c.WeekId).Preload("Stack").Find(c).Error; err != nil {
		return err
	}
	return nil
}

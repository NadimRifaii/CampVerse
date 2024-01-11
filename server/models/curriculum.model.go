package models

import "gorm.io/gorm"

type Curriculum struct {
	ID         uint `gorm:"primarykey"`
	BootcampID uint
	Title      string `json:"title" gorm:"not null;size:255;unique"`
	Bootcamp   Bootcamp
	Stack      []*Stack `json:"stacks"  gorm:"many2many:curriculum_stacks;"`
}

func (c *Curriculum) GetCurriculumsByBootcampID(db *gorm.DB, bootcampID uint) ([]Curriculum, error) {
	var curriculums []Curriculum

	// Use GORM to retrieve curriculums with the specified BootcampID
	if err := db.Preload("Stack").Where("bootcamp_id = ?", bootcampID).Find(&curriculums).Error; err != nil {
		return nil, err
	}

	return curriculums, nil
}

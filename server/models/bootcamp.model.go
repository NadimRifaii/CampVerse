package models

import "gorm.io/gorm"

type Bootcamp struct {
	gorm.Model
	Name             string  `json:"name" gorm:"not null;default:'first';size:255;unique"`
	LearningOutcomes string  `json:"outcomes" gorm:"not null;"`
	TargetAudiance   string  `json:"audience" gorm:"not null;;size:255"`
	User             []*User `gorm:"many2many:bootcamp_users;"`
}

func (bootcamp *Bootcamp) GetAllBootcamps(db *gorm.DB) ([]Bootcamp, error) {
	var bootcamps []Bootcamp
	if err := db.Find(&bootcamps).Error; err != nil {
		return nil, err
	}
	return bootcamps, nil
}
func (bootcamp *Bootcamp) GetBootcampByName(db *gorm.DB, name string) error {
	if err := db.Find(bootcamp, "name = ?", name).Error; err != nil {
		return err
	}
	return nil
}

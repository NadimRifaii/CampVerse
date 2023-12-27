package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"not null;default:'first';size:255"`
	Lastname string `json:"lastname" gorm:"not null;default:'last';size:255"`
	Email    string `json:"email" gorm:"not null;size:255;unique"`
	Password string `json:"password" gorm:"not null;size:255"`
	RoleID   uint
	UserRole UserRole    `gorm:"foreignKey:RoleID"`
	Bootcamp []*Bootcamp `gorm:"many2many:bootcamp_users;"`
}

func (user *User) GetUserByEmail(email string, db *gorm.DB) error {
	if err := db.Find(user, "email = ?", email).Error; err != nil {
		return err
	}
	return nil
}
func (user *User) GetBootcamps(db *gorm.DB) ([]Bootcamp, error) {
	var bootcamps []Bootcamp
	if err := db.Model(&user).Association("Bootcamp").Find(&bootcamps); err != nil {
		return nil, err
	}
	return bootcamps, nil
}

package models

import (
	"fmt"

	"gorm.io/gorm"
)

type Schedule struct {
	gorm.Model
	BootcampID uint `json:"bootcampId"`
	Bootcamp   Bootcamp
	Sessions   []*Session `json:"sessions"`
}

func (s *Schedule) AssociateUsersWithSessions(db *gorm.DB) error {
	for _, session := range s.Sessions {
		for _, user := range session.User {
			if err := db.Model(&session).Association("Users").Append(user); err != nil {
				return err
			}
		}
		fmt.Println(session.User)
	}
	return nil
}

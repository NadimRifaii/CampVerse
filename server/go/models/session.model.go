package models

import "gorm.io/gorm"

type Session struct {
	gorm.Model
	StartDate  string `json:"startDate"`
	EndDate    string `json:"endDate"`
	ScheduleID uint
	Schedule   Schedule
	User       []*User `gorm:"many2many:user_sessions"`
}

func AssociateUserWithSession(user *User, session *Session, db *gorm.DB) error {
	// Check if the association already exists
	if db.Model(session).Association("User").Find(user); user.ID == 0 {
		// If not, create the association
		if err := db.Model(session).Association("User").Append(user); err != nil {
			return err
		}
		// Update the session in the database
		if err := db.Save(session).Error; err != nil {
			return err
		}
	}

	return nil
}

package models

import "gorm.io/gorm"

type UserRole struct {
	gorm.Model
	RoleName string `json:"role" gorm:"not null;default:'user';size:255" `
}

func (ur *UserRole) GetIDByRoleName(db *gorm.DB, roleName string) (uint, error) {
	var userRole UserRole
	if err := db.Find(&userRole, "role_name = ?", roleName).Error; err != nil {
		return 0, err
	}
	return userRole.ID, nil
}

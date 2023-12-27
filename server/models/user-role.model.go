package models

import "gorm.io/gorm"

type UserRole struct {
	gorm.Model
	RoleName string `json:"role" gorm:"not null;default:'user';size:255" `
}

func (ur *UserRole) GetUserRoleByID(db *gorm.DB, id uint) error {
	if err := db.First(ur, id).Error; err != nil {
		return err
	}
	return nil
}
func (ur *UserRole) GetIDByRoleName(db *gorm.DB, roleName string) (uint, error) {
	if err := db.Find(ur, "role_name = ?", roleName).Error; err != nil {
		return 0, err
	}
	return ur.ID, nil
}

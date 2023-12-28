package models

import (
	"fmt"

	"gorm.io/gorm"
)

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
func (ur *UserRole) CreatePredefinedRoles(db *gorm.DB) {
	roles := []string{"admin", "user", "mentor"}

	for _, roleName := range roles {
		var existingRole UserRole
		result := db.Where("role_name = ?", roleName).First(&existingRole)

		if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
			fmt.Printf("Error checking existing role: %v\n", result.Error)
			continue
		}

		if result.Error == gorm.ErrRecordNotFound {
			// Role does not exist, add it to the database
			newRole := UserRole{RoleName: roleName}
			result := db.Create(&newRole)

			if result.Error != nil {
				fmt.Printf("Error creating role %s: %v\n", roleName, result.Error)
				continue
			}

			fmt.Printf("Role %s added successfully\n", roleName)
		} else {
			fmt.Printf("Role %s already exists\n", roleName)
		}
	}
}
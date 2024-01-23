package initializers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
)

func MigrateUserRoles() {
	userRole := new(models.UserRole)
	userRole.CreatePredefinedRoles(database.Db)
}

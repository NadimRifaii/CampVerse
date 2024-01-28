package initializers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
)

func MigratMostCommonPasswords() {
	commonPasswords := new(models.CommonPasswords)
	commonPasswords.CreateMost100CommonPasswords(database.Db)
}

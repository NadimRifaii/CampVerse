package database

import (
	"fmt"
	"log"
	"os"

	"github.com/NadimRifaii/campverse/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var Db *gorm.DB

func ConnectToDb() {
	user := os.Getenv("db_user")
	password := os.Getenv("db_password")
	dbName := os.Getenv("db_name")
	dsn := fmt.Sprintf("%v:@%vtcp(127.0.0.1:3306)/%v?charset=utf8mb4&parseTime=True&loc=Local", user, password, dbName)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	if err != nil {
		panic("Database connection failed")
	} else {
		log.Println("Connection successfull")
		db.AutoMigrate(new(models.User), new(models.UserRole), new(models.Bootcamp), new(models.Mentor))
	}
	Db = db
}

package database

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
)

var Db *gorm.DB

func ConnectToDb() {
	user := os.Getenv("db_user")
	password := os.Getenv("db_password")
	dbName := os.Getenv("db_name")
	dsn := fmt.Sprintf("%v:@%vtcp(127.0.0.1:3306)/%v?charset=utf8mb4&parseTime=True&loc=Local", user, password, dbName)
}

package controllers

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserBody struct {
	Username   string `json:"username" gorm:"not null;default:'first';size:255"`
	Lastname   string `json:"lastname" gorm:"not null;default:'last';size:255"`
	Email      string `json:"email" gorm:"not null;size:255;unique"`
	Password   string `json:"password" gorm:"not null;size:255"`
	RoleName   string `json:"role" gorm:"not null;default:'user';size:255" `
	Speciality string `json:"speciality" gorm:"not null;default:'x';size:255"`
	Position   string `json:"position" gorm:"not null;default:'x';size:255"`
}

func HttpSignup(c *fiber.Ctx) error {
	body := new(UserBody)
	user := new(models.User)
	if err := validateRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if body.RoleName == "" {
		body.RoleName = "student"
	}
	getRoleId(&user.UserRole, body.RoleName)
	populateUser(user, body, user.UserRole.ID)
	tokenString := createJwtToken(user, user.UserRole.RoleName)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": "Internal server error"})
	}
	user.Password = string(hashedPassword)
	err = CreateRecordInDb(user)
	if err != nil {
		return Loger(c, fiber.StatusConflict, fiber.Map{"error": err.Error()})
	}
	if body.RoleName == "mentor" {
		mentor := new(models.Mentor)
		populateMentor(mentor, user, body)
		CreateRecordInDb(mentor)
	} else if body.RoleName == "student" {
		student := new(models.Student)
		student.User = *user
		CreateRecordInDb(student)
	}
	tokenEncoded, err := tokenString.SignedString([]byte(os.Getenv("secret")))
	if err != nil {
		return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": "Failed to sign the token"})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"token": tokenEncoded, "email": user.Email, "username": user.Username, "role": user.UserRole.RoleName})
}

func HttpLogin(c *fiber.Ctx) error {
	db := database.Db
	body := new(UserBody)
	user := new(models.User)
	if err := validateRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if err := user.GetUserByEmail(body.Email, db); err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	if err := user.UserRole.GetUserRoleByID(db, user.RoleID); err != nil {
		return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
	}
	password := body.Password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": "Wrong password"})
	}
	tokenString := createJwtToken(user, user.UserRole.RoleName)
	tokenEncoded, err := tokenString.SignedString([]byte(os.Getenv("secret")))
	if err != nil {
		return Loger(c, fiber.StatusInternalServerError, fiber.Map{"error": "Failed to sign the token"})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"token": tokenEncoded, "email": user.Email, "username": user.Username, "role": user.UserRole.RoleName})
}

func validateRequest(c *fiber.Ctx, body *UserBody) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("invalid request body")
	} else if body.Email == "" || body.Password == "" {
		return errors.New("missing credentials")
	}
	return nil
}
func populateUser(user *models.User, body *UserBody, id uint) {
	user.Email = body.Email
	user.Password = body.Password
	user.RoleID = id
	user.Username = body.Username
	user.Lastname = body.Lastname
}
func populateMentor(mentor *models.Mentor, user *models.User, body *UserBody) {
	mentor.Speciality = body.Speciality
	mentor.Position = body.Password
	mentor.User = *user
}
func Loger(c *fiber.Ctx, status int, m fiber.Map) error {
	return c.Status(status).JSON(m)
}
func CreateRecordInDb(record interface{}) error {
	db := database.Db
	result := db.Create(record)
	return checkExistingEmail(result)
}
func checkExistingEmail(result *gorm.DB) error {
	if result.Error != nil {
		// Check if the error is a MySQL error with code 1062 (duplicate entry)
		mysqlErr, isMySQLError := result.Error.(*mysql.MySQLError)
		if isMySQLError && mysqlErr.Number == 1062 {
			// Parse the error message to get the conflicting email
			if strings.Contains(mysqlErr.Message, "for key 'email'") {
				return errors.New("email is already in use")
			}
		}
		return errors.New(result.Error.Error())
	}
	return nil
}
func createJwtToken(user *models.User, roleName string) *jwt.Token {
	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp":      time.Now().Add(time.Hour).Unix(),
		"role":     roleName,
		"username": user.Username,
		"email":    user.Email,
	})
}
func getRoleId(userRole *models.UserRole, roleName string) {
	db := database.Db
	userRole.GetIDByRoleName(db, roleName)
}

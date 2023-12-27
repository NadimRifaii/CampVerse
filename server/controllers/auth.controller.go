package controllers

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

type Body struct {
	Username string `json:"username" gorm:"not null;default:'first';size:255"`
	Lastname string `json:"lastname" gorm:"not null;default:'last';size:255"`
	Email    string `json:"email" gorm:"not null;size:255;unique"`
	Password string `json:"password" gorm:"not null;size:255"`
	RoleName string `json:"role" gorm:"not null;default:'user';size:255" `
}

func Signup(c *fiber.Ctx) error {
	body := new(Body)
	user := new(models.User)
	userRole := new(models.UserRole)
	if err := validateRequest(c, body); err != nil {
		return loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if body.RoleName == "" {
		body.RoleName = "user"
	}
	getRoleId(userRole, body.RoleName)
	populateUser(user, body, userRole.ID)
	tokenString := createJwtToken(user, userRole.RoleName)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return loger(c, fiber.StatusInternalServerError, fiber.Map{"error": "Internal server error"})
	}
	user.Password = string(hashedPassword)
	err = createUserInDb(c, user)
	if err != nil {
		if isDuplicate := isDuplicateKeyError(err); isDuplicate {
			return loger(c, fiber.StatusConflict, fiber.Map{"error": "This email already exists!"})
		}
	}
	tokenEncoded, err := tokenString.SignedString([]byte(os.Getenv("secret")))
	if err != nil {
		return loger(c, fiber.StatusInternalServerError, fiber.Map{"error": "Failed to sign the token"})
	}
	return loger(c, fiber.StatusAccepted, fiber.Map{"token": tokenEncoded, "username": user.Username, "role": userRole.RoleName})
}

func validateRequest(c *fiber.Ctx, body *Body) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("invalid request body")
	} else if body.Email == "" || body.Password == "" {
		return errors.New("missing credentials")
	}
	return nil
}
func populateUser(user *models.User, body *Body, id uint) {
	fmt.Println(id)
	user.Email = body.Email
	user.Password = body.Password
	user.RoleID = id
	user.Username = body.Username
	user.Lastname = body.Lastname
}
func loger(c *fiber.Ctx, status int, m fiber.Map) error {
	return c.Status(status).JSON(m)
}
func createUserInDb(c *fiber.Ctx, user *models.User) error {
	db := database.Db
	result := db.Create(user)
	if result.Error != nil {
		return result.Error
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
func isDuplicateKeyError(err error) bool {
	var mysqlErr *mysql.MySQLError
	if errors.As(err, &mysqlErr) {
		if mysqlErr.Number == 1062 {
			return true
		}
	}
	return false
}

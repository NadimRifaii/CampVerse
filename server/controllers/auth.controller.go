package controllers

import (
	"errors"
	"time"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func Signup(c *fiber.Ctx) error {

}
func validateUserRequest(c *fiber.Ctx, user *models.User) error {
	if err := c.BodyParser(user); err != nil {
		return errors.New("invalid request body")
	} else if user.Email == "" || user.Password == "" {
		return errors.New("missing credentials")
	}
	return nil
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
	userRole := getRoleId(roleName)
	return jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp":      time.Now().Add(time.Hour).Unix(),
		"role":     userRole.ID,
		"username": user.Username,
		"email":    user.Email,
	})
}
func getRoleId(roleName string) *models.UserRole {
	userRole := new(models.UserRole)
	db := database.Db
	userRole.GetIDByRoleName(db, roleName)
	return userRole
}

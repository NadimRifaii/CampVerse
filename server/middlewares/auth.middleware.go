package middlewares

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func RequireAuth(c *fiber.Ctx) error {
	authorizationHeader := c.Get("Authorization")
	if authorizationHeader == "" {
		c.Locals("error", "No Authorization header")
		return c.Next()
	}
	token := strings.Replace(authorizationHeader, "Bearer", "", 1)
	tokenDecoded, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("secret")), nil
	})
	if err != nil {
		log.Fatal(err)
	}
	if claims, ok := tokenDecoded.Claims.(jwt.MapClaims); ok {
		email := claims["email"].(string)
		user := new(models.User)
		user.GetUserByEmail(email, database.Db)
		c.Locals("user", user)
	} else {
		log.Fatal(err)
	}
	return c.Next()
}

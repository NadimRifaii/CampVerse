package main

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/initializers"
	"github.com/NadimRifaii/campverse/middlewares"
	"github.com/NadimRifaii/campverse/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/sashabaranov/go-openai"
)

func init() {
	initializers.LoadEnv()
	database.ConnectToDb()
	initializers.MigrateUserRoles()
}

func setupApp() *fiber.App {
	app := fiber.New()
	app.Static("/", "./public")
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))
	return app
}

func setupProtectedGroups(app *fiber.App, paths []string) []fiber.Router {
	var groups []fiber.Router
	for _, path := range paths {
		group := app.Group(path)
		group.Use(middlewares.RequireAuth)
		groups = append(groups, group)
	}
	return groups
}

func registerRoutes(groups []fiber.Router, routeFuncs ...func(group fiber.Router)) {
	for i, routeFunc := range routeFuncs {
		routeFunc(groups[i])
	}
}
func ReadFileContent(c *fiber.Ctx) error {
	substring := c.Query("substring")
	if substring == "" {
		return errors.New("file name invalid")
	}

	fileDir := "public/files"
	files, err := ioutil.ReadDir(fileDir)
	if err != nil {
		return errors.New(err.Error())
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}
		if strings.Contains(file.Name(), substring) {
			filePath := filepath.Join(fileDir, file.Name())
			content, err := ioutil.ReadFile(filePath)
			if err != nil {
				return errors.New(err.Error())
			}
			return c.JSON(fiber.Map{"content": string(content)})
		}
	}

	return errors.New("file not found")
}

func openAi() {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatalln("Missing API KEY")
	}

	client := openai.NewClient(apiKey)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "I want you to give me an json object , just json object and don't say anything else , the json object is of this form {name:'',lastname:''}",
				},
			},
		},
	)
	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	fmt.Println(resp.Choices[0].Message.Content)
}

func main() {
	app := setupApp()

	protectedPaths := []string{"/auth", "/schedule", "/bootcamp", "/stacks", "/mentor", "/assignment", "/result", "/user", "/curriculum"}
	groups := setupProtectedGroups(app, protectedPaths)

	registerRoutes(groups,
		routes.AuthRoutes,
		routes.ScheduleRoutes,
		routes.BootcampRoutes,
		routes.StackRoutes,
		routes.MentorRoutes,
		routes.AssignmentRoutes,
		routes.ResultRoutes,
		routes.UserRoutes,
		routes.CurriculumRoutes,
	)
	app.Listen(os.Getenv("PORT"))
	// openAi()
}

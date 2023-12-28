package controllers

import (
	"errors"
	"fmt"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type scheduleBody struct {
	Days []*models.Day `json:"days"`
}

func HttpCreateSchedule(c *fiber.Ctx) error {
	db := database.Db
	mentor, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	body := new(scheduleBody)
	if err := validateScheduleRequest(c, db, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error(), "mentor": mentor})
	}
	createDayRecords(c, body.Days)
	return Loger(c, fiber.StatusAccepted, fiber.Map{"body": body})
}

func validateScheduleRequest(c *fiber.Ctx, dd *gorm.DB, body *scheduleBody) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("bad request")
	}
	return nil
}
func createDayRecords(c *fiber.Ctx, days []*models.Day) {
	for _, day := range days {
		fmt.Println(day)
	}
}

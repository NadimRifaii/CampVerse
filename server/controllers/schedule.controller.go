package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

type scheduleBody struct {
	Week string        `json:"week"`
	Days []*models.Day `json:"days"`
}

func HttpCreateSchedule(c *fiber.Ctx) error {
	db := database.Db
	mentor, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	body := new(scheduleBody)
	if err := validateScheduleRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error(), "mentor": mentor})
	}
	schedule := new(models.Schedule)
	schedule.Week = body.Week
	if err := CreateRecordInDb(schedule); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	createDayRecords(c, body.Days, schedule)
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})
}
func HttpGetScheduleByWeek(c *fiber.Ctx) error {
	body := new(scheduleBody)
	if err := validateScheduleRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	schedule := new(models.Schedule)
	schedule.Week = body.Week
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})

}
func validateScheduleRequest(c *fiber.Ctx, body *scheduleBody) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("bad request")
	}
	return nil
}
func createDayRecords(c *fiber.Ctx, days []*models.Day, schedule *models.Schedule) error {
	for _, day := range days {
		day.ScheduleId = schedule.ID
		if err := CreateRecordInDb(day); err != nil {
			return errors.New("internal server error")
		}
		schedule.Days = append(schedule.Days, day)
	}
	return nil
}

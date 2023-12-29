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
	schedule.Days = body.Days
	handleDayRecords(c, "create", schedule)
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})
}
func HttpGetScheduleByWeek(c *fiber.Ctx) error {
	body := new(scheduleBody)
	if err := validateScheduleRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	db := database.Db
	schedule := new(models.Schedule)
	schedule.Week = body.Week
	schedule.GetScheduleByWeek(db)
	schedule.GetScheduleDays(db)
	handleDayRecords(c, "get", schedule)
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})

}
func validateScheduleRequest(c *fiber.Ctx, body *scheduleBody) error {
	if err := c.BodyParser(body); err != nil {
		return errors.New("bad request")
	}
	return nil
}
func handleDayRecords(c *fiber.Ctx, action string, schedule *models.Schedule) error {
	db := database.Db
	for _, day := range schedule.Days {
		day.ScheduleId = schedule.ID
		if action == "create" {
			if err := CreateRecordInDb(day); err != nil {
				return errors.New("internal server error")
			}
		} else if action == "get" {
			day.GetDaySessions(db)
		}
		schedule.Days = append(schedule.Days, day)
	}
	return nil
}

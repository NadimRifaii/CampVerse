package controllers

import (
	"errors"

	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

type scheduleBody struct {
	Week       string        `json:"week"`
	BootcampID uint          `json:"bootcamp_id"`
	Days       []*models.Day `json:"days"`
}

func HttpCreateSchedule(c *fiber.Ctx) error {
	db := database.Db
	mentor, err := GetMentor(c, db)
	if err != nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": err.Error()})
	}
	body := new(scheduleBody)
	if err := ValidateRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error(), "mentor": mentor})
	}
	schedule := new(models.Schedule)
	schedule.Week = body.Week
	schedule.BootcampID = body.BootcampID

	if err := CreateRecordInDb(schedule); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	schedule.Days = body.Days
	handleDayRecords(c, "create", schedule)
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": schedule})
}
func HttpGetScheduleByWeek(c *fiber.Ctx) error {
	body := new(scheduleBody)
	if err := ValidateRequest(c, body); err != nil {
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
func HttpGetBootcampSchedule(c *fiber.Ctx) error {
	var body struct {
		BootcampID uint `json:"bootcamp_id"`
	}
	db := database.Db
	if err := ValidateRequest(c, &body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	schedules, err := models.GetBootcampSchedules(db, body.BootcampID)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	cleanedData := models.CleanSchedulesData(schedules)
	return Loger(c, fiber.StatusAccepted, fiber.Map{"schedule": cleanedData})
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

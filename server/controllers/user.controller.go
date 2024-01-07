package controllers

import (
	"github.com/NadimRifaii/campverse/database"
	"github.com/NadimRifaii/campverse/models"
	"github.com/gofiber/fiber/v2"
)

func HttpGetUser(c *fiber.Ctx) error {
	db := database.Db
	user := new(models.User)
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	if user.UserRole.RoleName == "mentor" {
		mentor := new(models.Mentor)
		if err := mentor.GetMentorByID(db, user.ID); err != nil {
			return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
		}
		var mentorResponse struct {
			Speciality string          `json:"speciality"`
			Position   string          `json:"position"`
			Stacks     []*models.Stack `json:"stacks"`
		}
		mentorResponse.Position = mentor.Position
		mentorResponse.Speciality = mentor.Speciality
		mentorResponse.Stacks = mentor.Stack
		return Loger(c, fiber.StatusAccepted, fiber.Map{"info": mentorResponse})
	} else {
		student := new(models.Student)
		if err := student.GetStudentByID(db, user.ID); err != nil {
			return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
		}
		return Loger(c, fiber.StatusAccepted, fiber.Map{"info": student})
	}
}

func HttpUploadImage(c *fiber.Ctx) error {
	user := new(models.User)
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}

	file, err := c.FormFile("file")
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	c.SaveFile(file, "public/images/"+file.Filename)
	return Loger(c, fiber.StatusAccepted, fiber.Map{"file": file})
}
func HttpUpdateUserProfile(c *fiber.Ctx) error {
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	body := new(UserInfoRequest)
	if err := ValidateRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	user.Username = body.Username
	user.FirstName = body.FirstName
	user.Lastname = body.Lastname
	user.Image_url = body.Image_url
	if err := user.UpdateUser(db); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if user.UserRole.RoleName == "mentor" {
		mentor := new(models.Mentor)
		if err := mentor.GetMentorByID(db, user.ID); err != nil {
			return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
		}
		return Loger(c, fiber.StatusAccepted, fiber.Map{"info": "updated successfully"})
	} else {
		student := new(models.Student)
		if err := student.GetStudentByID(db, user.ID); err != nil {
			return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
		}
		return Loger(c, fiber.StatusAccepted, fiber.Map{"info": "updated successfully"})
	}
}

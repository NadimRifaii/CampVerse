package controllers

import (
	"fmt"

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
	if user.UserRole.RoleName == "admin" {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"info": user})
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
			fmt.Println("sss")
			return Loger(c, fiber.StatusNotFound, fiber.Map{"user": user, "error": err.Error()})
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

func HttpGetAllUsers(c *fiber.Ctx) error {
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	users, err := user.GetAllUsers(db)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"users": users})
}
func HttpGetAllMentorUsers(c *fiber.Ctx) error {
	user := new(models.User)
	db := database.Db
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	mentors, err := user.GetAllMentorUsers(db)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"err": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"users": mentors})
}
func HttpGetAllStudentUsers(c *fiber.Ctx) error {
	db := database.Db
	user := new(models.User)
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	students, err := user.GetAllStudentUsers(db)
	if err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"err": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"users": students})
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
	fmt.Println(body)
	currentUser := new(models.User)
	if err := currentUser.GetUserByEmail(body.Email, db); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	currentUser.UserName = body.Username
	currentUser.FirstName = body.FirstName
	currentUser.LastName = body.Lastname
	currentUser.ProfilePicture = body.ProfilePicture
	if err := currentUser.UpdateUser(db, body.RoleName); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	if currentUser.UserRole.RoleName == "admin" {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"info": "updated successfully", "body": body})
	} else if currentUser.UserRole.RoleName == "mentor" {
		mentor := new(models.Mentor)
		if err := mentor.GetMentorByID(db, currentUser.ID); err != nil {
			return Loger(c, fiber.StatusNotFound, fiber.Map{"error": err.Error()})
		}
		mentor.Speciality = body.Speciality
		mentor.Position = body.Position
		mentor.UserId = currentUser.ID
		if err := mentor.UpdateMentor(db); err != nil {
			return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
		}
		return Loger(c, fiber.StatusAccepted, fiber.Map{"info": "updated successfully", "body": body})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"info": "updated successfully"})

}

func HttpUpdateUserRole(c *fiber.Ctx) error {
	db := database.Db
	user := new(models.User)
	if user = GetAuthUser(c); user == nil {
		return Loger(c, fiber.StatusUnauthorized, fiber.Map{"error": "Unauthorized"})
	}
	body := new(UserInfoRequest)
	if err := ValidateRequest(c, body); err != nil {
		return Loger(c, fiber.StatusBadRequest, fiber.Map{"error": err.Error()})
	}
	currentUser := new(models.User)
	if err := currentUser.GetUserByEmail(body.Email, db); err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}
	if currentUser.UserRole.RoleName == body.RoleName {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "Same role"})
	}
	if err := currentUser.UpdateUserRoleByEmail(db, body.Email, body.RoleName); err != nil {
		return Loger(c, fiber.StatusAccepted, fiber.Map{"error": err.Error()})
	}
	return Loger(c, fiber.StatusAccepted, fiber.Map{"message": "User updated"})
}

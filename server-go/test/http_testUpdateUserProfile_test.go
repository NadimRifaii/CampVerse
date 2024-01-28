package test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type updateUserRequest struct {
	Email          string `json:"email"`
	UserName       string `json:"username"`
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	Position       string `json:"position"`
	Speciality     string `json:"speciality"`
	Role           string `json:"role"`
	ProfilePicture string `json:"profilePicture"`
}

func (s *EndToEndSuite) TestUpdateUserProfile() {
	requestBody := updateUserRequest{
		UserName:       "Roger",
		FirstName:      "Nadim",
		LastName:       "Rifaii",
		ProfilePicture: "20220514_155336.jpg",
		Email:          "student1@gmail.com",
		Speciality:     "Updated speciality",
		Position:       "Updated position",
		Role:           "mentor",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	//needs to be valid token, and the token of the current authenticated user
	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0dWRlbnQxQGdtYWlsLmNvbSIsImV4cCI6MTcwNjQ3MzY2MSwiZmlyc3RuYW1lIjoiUHJpbmNlIiwibGFzdG5hbWUiOiJWZWdldGEiLCJwcm9maWxlUGljdHVyZSI6Ik9JUC5qcGciLCJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiUHJpbmNlIn0.dBxEkioDBg4dVvrcXMChto4ohRnV1UX5vGmGYixPOkk"

	req, err := http.NewRequest("PUT", "http://localhost:8000/user", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	r, err := c.Do(req)
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusAccepted, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedResponse := map[string]interface{}{
		"info": "updated successfully",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedResponse, actualResponse)
	//This test is to check if the user is already in the bootcamp , it shouldn't add it again instead it returns an error
}
func (s *EndToEndSuite) TestUpdateUserProfileUnauthorized() {
	requestBody := updateUserRequest{
		UserName:       "Roger",
		FirstName:      "Nadim",
		LastName:       "Rifaii",
		ProfilePicture: "20220514_155336.jpg",
		Email:          "student1@gmail.com",
		Speciality:     "Updated speciality",
		Position:       "Updated position",
		Role:           "mentor",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	//needs to be valid token, and the token of the current authenticated user
	token := ""
	req, err := http.NewRequest("PUT", "http://localhost:8000/user", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	r, err := c.Do(req)
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusUnauthorized, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedResponse := map[string]interface{}{
		"error": "Unauthorized",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedResponse, actualResponse)
	//This test is to check if the user is already in the bootcamp , it shouldn't add it again instead it returns an error
}

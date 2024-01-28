package test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type addUserRequest struct {
	Email        string `json:"email"`
	BootcampName string `json:"bootcampName"`
}

func (s *EndToEndSuite) TestAddUserToBootcamp() {
	requestBody := addUserRequest{
		Email:        "mentor1@gmail.com",
		BootcampName: "Test9",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	//needs to be valid token
	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTcwNjQ3NDM2OCwiZmlyc3RuYW1lIjoiYWRtaW4iLCJsYXN0bmFtZSI6ImFkbWluIiwicHJvZmlsZVBpY3R1cmUiOiIyMDIyMDUxNF8xNTUzMzYuanBnIiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbl91c2VyIn0.SneXCGaRo4fmnOFZ1m6vqsiMeS4Tksnc5mTbR4Xr8C0"

	req, err := http.NewRequest("POST", "http://localhost:8000/bootcamp/add-user", bytes.NewBuffer(requestBodyJSON))
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
		"message": "User action successful",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedResponse, actualResponse)
	//This test is to check if the user is already in the bootcamp , it shouldn't add it again instead it returns an error
}

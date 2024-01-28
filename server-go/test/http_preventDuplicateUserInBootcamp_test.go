package test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type preventDuplicateRequest struct {
	Email        string `json:"email"`
	BootcampName string `json:"bootcampName"`
}

func (s *EndToEndSuite) TestPreventDuplicateUserInBootcamp() {
	requestBody := preventDuplicateRequest{
		Email:        "student1@gmail.com",
		BootcampName: "FSW",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	//needs to be a valid token of an admin
	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTcwNjQ4MDQxNiwiZmlyc3RuYW1lIjoiYWRtaW4iLCJsYXN0bmFtZSI6ImFkbWluIiwicHJvZmlsZVBpY3R1cmUiOiJkZWZhdWx0X3Byb2ZpbGVfcGljdHVyZS5qcGciLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIn0.qeepOLvHCLM1tz1qzupmOuPOks_EqqCmkiZOn6s17Ak"

	req, err := http.NewRequest("POST", "http://localhost:8000/bootcamp/add-user", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	r, err := c.Do(req)
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusBadRequest, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedResponse := map[string]interface{}{
		"error": "User already exist in this bootcamp",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedResponse, actualResponse)
	//This test is to check if the user is already in the bootcamp , it shouldn't add it again instead it returns an error
}

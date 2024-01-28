// http_signup_test.go

package test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/stretchr/testify/suite"
)

type EndToEndSuite struct {
	suite.Suite
}

func TestEndToEndSuite(t *testing.T) {
	suite.Run(t, new(EndToEndSuite))
}

type RequestBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *EndToEndSuite) TestLoginSuccessful() {
	requestBody := RequestBody{
		Email:    "student1@gmail.com",
		Password: "password",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	r, err := c.Post("http://localhost:8000/auth/login", "application/json", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusAccepted, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedUser := map[string]interface{}{
		"email":          "student1@gmail.com",
		"username":       "Prince",
		"role":           "student",
		"profilePicture": "OIP.jpg",
		"firstname":      "Prince",
		"lastname":       "Vegeta",
	}

	actualResponse := map[string]interface{}{} //similiar to js objects , key:value , key of type string , vaalue of type interface{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedUser, actualResponse["user"])
}
func (s *EndToEndSuite) TestLoginWrongPassword() {
	requestBody := RequestBody{
		Email: "student1@gmail.com",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	r, err := c.Post("http://localhost:8000/auth/login", "application/json", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusBadRequest, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedResponse := map[string]interface{}{
		"error": "Wrong password",
	}

	actualResponse := map[string]interface{}{} //similiar to js objects , key:value , key of type string , vaalue of type interface{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)
	s.Equal(expectedResponse, actualResponse)
}
func (s *EndToEndSuite) TestInvalidEmail() {
	requestBody := RequestBody{
		Email:    "student1gmail.com",
		Password: "password",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	r, err := c.Post("http://localhost:8000/auth/login", "application/json", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusBadRequest, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedResponse := map[string]interface{}{
		"error": "Invalid email format. Must be at least 4 characters followed by @gmail.com",
	}

	actualResponse := map[string]interface{}{} //similiar to js objects , key:value , key of type string , vaalue of type interface{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)
	s.Equal(expectedResponse, actualResponse)
}

//go test github.com/NadimRifaii/campverse/test -run TestEndToEndSuite

package test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func (s *EndToEndSuite) TestSignupSuccessful() {
	requestBody := map[string]interface{}{
		"email":     "studentxxxxx@gmail.com",
		"username":  "L",
		"firstname": "L",
		"lastname":  "L",
		"role":      "student",
		"password":  "333#GoldRoger",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	r, err := c.Post("http://localhost:8000/auth/signup", "application/json", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)
	defer r.Body.Close()

	// Check for the expected HTTP status code
	s.Equal(http.StatusAccepted, r.StatusCode)

	// Read and parse the response body
	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	// Manually extract and compare the relevant values
	expectedUser := map[string]interface{}{
		"email":          "studentxxxxx@gmail.com",
		"username":       "L",
		"role":           "student",
		"profilePicture": "default_profile_picture.jpg",
		"firstname":      "L",
		"lastname":       "L",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	// Compare the actual and expected values
	s.Equal(expectedUser, actualResponse["user"])
}
func (s *EndToEndSuite) TestSignupInvalidPassword() {
	requestBody := map[string]interface{}{
		"email":     "ddddd@gmail.com",
		"username":  "L",
		"firstname": "L",
		"lastname":  "L",
		"role":      "mentor",
		"password":  "password",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	r, err := c.Post("http://localhost:8000/auth/signup", "application/json", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusBadRequest, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedResponse := map[string]interface{}{
		"error": "Password is too common. Choose a stronger password.",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedResponse, actualResponse)
}
func (s *EndToEndSuite) TestSignupInvalidEmail() {
	requestBody := map[string]interface{}{
		"email":     "gmail.com",
		"username":  "L",
		"firstname": "L",
		"lastname":  "L",
		"role":      "mentor",
		"password":  "333#GoldRoger",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	r, err := c.Post("http://localhost:8000/auth/signup", "application/json", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)
	defer r.Body.Close()

	s.Equal(http.StatusBadRequest, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedResponse := map[string]interface{}{
		"error": "Invalid email format. Must be at least 4 characters followed by @gmail.com",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedResponse, actualResponse)
}

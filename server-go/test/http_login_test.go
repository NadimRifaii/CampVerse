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

// TestLoginSuccessful checks the response when the user logs in successfully.
func (s *EndToEndSuite) TestLoginSuccessful() {
	requestBody := map[string]interface{}{
		"email":    "student1@gmail.com",
		"password": "password",
	}

	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	c := http.Client{}
	r, err := c.Post("http://localhost:8000/auth/login", "application/json", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)
	defer r.Body.Close()

	// Check for the expected HTTP status code
	s.Equal(http.StatusAccepted, r.StatusCode)

	// Read and parse the response body
	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	// Manually extract and compare the relevant values
	expectedUser := map[string]interface{}{
		"email":          "student1@gmail.com",
		"username":       "Prince",
		"role":           "student",
		"profilePicture": "OIP.jpg",
		"firstname":      "Prince",
		"lastname":       "Vegeta",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	// Compare the actual and expected values
	s.Equal(expectedUser, actualResponse["user"])
}

//go test github.com/NadimRifaii/campverse/test -run TestEndToEndSuite

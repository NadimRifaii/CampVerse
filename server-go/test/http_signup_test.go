package test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func (s *EndToEndSuite) TestSignupSuccessful() {
	requestBody := map[string]interface{}{
		"email":     "ddd@gmail.com",
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

	s.Equal(http.StatusAccepted, r.StatusCode)

	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	expectedUser := map[string]interface{}{
		"email":          "ddd@gmail.com",
		"username":       "L",
		"role":           "mentor",
		"profilePicture": "default_profile_picture.jpg",
		"firstname":      "L",
		"lastname":       "L",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	s.Equal(expectedUser, actualResponse["user"])
}

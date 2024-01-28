package test

// import (
// 	"bytes"
// 	"encoding/json"
// 	"io/ioutil"
// 	"net/http"
// )

// func (s *EndToEndSuite) TestSignupSuccessful() {
// 	requestBody := map[string]interface{}{
// 		"email":     "dd@gmail.com",
// 		"username":  "L",
// 		"firstname": "L",
// 		"lastname":  "L",
// 		"role":      "mentor",
// 		"password":  "password",
// 	}

// 	requestBodyJSON, err := json.Marshal(requestBody)
// 	s.NoError(err)

// 	c := http.Client{}
// 	r, err := c.Post("http://localhost:8000/auth/signup", "application/json", bytes.NewBuffer(requestBodyJSON))
// 	s.NoError(err)
// 	defer r.Body.Close()

// 	// Check for the expected HTTP status code
// 	s.Equal(http.StatusAccepted, r.StatusCode)

// 	// Read and parse the response body
// 	responseJSON, err := ioutil.ReadAll(r.Body)
// 	s.NoError(err)

// 	// Manually extract and compare the relevant values
// 	expectedUser := map[string]interface{}{
// 		"email":          "dd@gmail.com",
// 		"username":       "L",
// 		"role":           "mentor",
// 		"profilePicture": "default_profile_picture.jpg",
// 		"firstname":      "L",
// 		"lastname":       "L",
// 	}

// 	actualResponse := map[string]interface{}{}
// 	err = json.Unmarshal(responseJSON, &actualResponse)
// 	s.NoError(err)

// 	// Compare the actual and expected values
// 	s.Equal(expectedUser, actualResponse["user"])
// }

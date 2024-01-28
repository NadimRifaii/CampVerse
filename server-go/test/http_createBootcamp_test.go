package test

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func (s *EndToEndSuite) TestCreateBootcampSuccessful() {
	// Prepare the request body
	requestBody := map[string]interface{}{
		"name":          "test",
		"outcomes":      "Random",
		"audience":      "Random",
		"numberOfWeeks": float64(3),
		"startDate":     "2024-01-01",
		"endDate":       "2024-01-15",
	}

	// Convert the request body to JSON
	requestBodyJSON, err := json.Marshal(requestBody)
	s.NoError(err)

	// Prepare the HTTP client
	c := http.Client{}

	// Replace "your_token_here" with a valid token obtained from authentication
	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTcwNjQ2NjQ1MSwiZmlyc3RuYW1lIjoiYWRtaW4iLCJsYXN0bmFtZSI6ImFkbWluIiwicHJvZmlsZVBpY3R1cmUiOiIyMDIyMDUxNF8xNTUzMzYuanBnIiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbl91c2VyIn0.FmeZZzBLGhrDDauc1o8_uBNO-vbmSCPG9pqM4Ys6Mrg"

	// Prepare the HTTP request
	req, err := http.NewRequest("POST", "http://localhost:8000/bootcamp", bytes.NewBuffer(requestBodyJSON))
	s.NoError(err)

	// Set the Authorization header with the token
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	// Send the HTTP request
	r, err := c.Do(req)
	s.NoError(err)
	defer r.Body.Close()

	// Check for the expected HTTP status code
	s.Equal(http.StatusAccepted, r.StatusCode)

	// Read and parse the response body
	responseJSON, err := ioutil.ReadAll(r.Body)
	s.NoError(err)

	// Manually extract and compare the relevant values
	expectedResponse := map[string]interface{}{
		"message": "Bootcamp was created successfully",
	}

	actualResponse := map[string]interface{}{}
	err = json.Unmarshal(responseJSON, &actualResponse)
	s.NoError(err)

	// Compare the actual and expected values based on the message
	s.Equal(expectedResponse, actualResponse)
}

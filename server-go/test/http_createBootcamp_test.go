package test

// import (
// 	"bytes"
// 	"encoding/json"
// 	"io/ioutil"
// 	"net/http"
// )

// type BootcampRequestBody struct {
// 	Name          string  `json:"name"`
// 	Outcomes      string  `json:"outcomes"`
// 	Audience      string  `json:"audience"`
// 	NumberOfWeeks float64 `json:"numberOfWeeks"`
// 	StartDate     string  `json:"startDate"`
// 	EndDate       string  `json:"endDate"`
// }

// func (s *EndToEndSuite) TestCreateBootcampSuccessful() {
// 	// Prepare the request body
// 	requestBody := BootcampRequestBody{
// 		Name:          "test8",
// 		Outcomes:      "Random",
// 		Audience:      "Random",
// 		NumberOfWeeks: float64(3),
// 		StartDate:     "2024-01-01",
// 		EndDate:       "2024-01-15",
// 	}

// 	// Convert the request body to JSON
// 	requestBodyJSON, err := json.Marshal(requestBody)
// 	s.NoError(err)

// 	c := http.Client{}

// 	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTcwNjQ3NDM2OCwiZmlyc3RuYW1lIjoiYWRtaW4iLCJsYXN0bmFtZSI6ImFkbWluIiwicHJvZmlsZVBpY3R1cmUiOiIyMDIyMDUxNF8xNTUzMzYuanBnIiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbl91c2VyIn0.SneXCGaRo4fmnOFZ1m6vqsiMeS4Tksnc5mTbR4Xr8C0"

// 	req, err := http.NewRequest("POST", "http://localhost:8000/bootcamp", bytes.NewBuffer(requestBodyJSON))
// 	s.NoError(err)

// 	req.Header.Set("Authorization", "Bearer "+token)
// 	req.Header.Set("Content-Type", "application/json")

// 	r, err := c.Do(req)
// 	s.NoError(err)
// 	defer r.Body.Close()

// 	s.Equal(http.StatusAccepted, r.StatusCode)

// 	responseJSON, err := ioutil.ReadAll(r.Body)
// 	s.NoError(err)

// 	expectedResponse := map[string]interface{}{
// 		"message": "Bootcamp was created successfully",
// 	}

// 	actualResponse := map[string]interface{}{}
// 	err = json.Unmarshal(responseJSON, &actualResponse)
// 	s.NoError(err)

// 	// Compare the actual and expected values based on the message
// 	s.Equal(expectedResponse, actualResponse)
// }

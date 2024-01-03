import axios from "axios";
export async function request(url, method, data = {}, headers = {}) {
  try {
    const res = await axios.request({
      url: `http://localhost:8000/${url}`,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
    })
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error("Network error. Please try again.");
    } else {
      throw error;
    }
  }
}
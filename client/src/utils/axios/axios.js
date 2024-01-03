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
    throw new Error(error.response.data.error)
  }
}
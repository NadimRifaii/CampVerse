import { sendRequest } from "../../helpers/request";
export const authDataSource = {
  login: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/auth/login",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  register: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/auth/signup",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  refresh: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/auth/refresh",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
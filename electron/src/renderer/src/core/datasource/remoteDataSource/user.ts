import { sendRequest } from "../../helpers/request";
export const userDataSource = {
  getUser: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/user",
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  uploadImage: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/user/profile",
        method: "POST"
      })
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  },
  updateProfile: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/user",
        method: "PUT"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  getAllUsers: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/user/all-useres",
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
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

}
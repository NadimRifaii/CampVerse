
import { sendRequest } from "../../helpers/request"
export const messagesDataSource = {
  getStudentSubmissions: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/assignment/user-submissions",
        method: "GET"
      })
    } catch (error: any) {
      throw new Error(error)
    }
  },
}
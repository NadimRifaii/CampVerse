
import { sendRequest } from "../../helpers/request"
export const submissionsDataSource = {
  getStudentSubmissions: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/assignment/user-submissions",
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
}
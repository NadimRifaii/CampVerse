import { sendRequest } from "../../helpers/request";
export const assignmentDataSource = {
  createAssignment: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/assignment",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
}
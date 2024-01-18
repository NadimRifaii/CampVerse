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
      throw new Error(error.message)
    }
  },

  getBootcampAssignments: async (data: { id: number }) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/assignment/bootcamp-assignments?id=${data.id}`
      })
      return response.assignments
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  downloadFile: async (data: { filename: string }) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/assignment/download?substring=${data.filename}`
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  getNumberOfSubmissions: async (data: { assignmentTitle: string }) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/assignment/assignment-submissions",
        method: "POST"
      })
      return response.numberOfSubmissions
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
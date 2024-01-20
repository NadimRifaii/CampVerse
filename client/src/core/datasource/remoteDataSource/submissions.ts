
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
  getAssignmentFiles: async (data: { assignmentName: string }) => {
    console.log(data)
    try {
      const response = await sendRequest({
        body: data,
        route: `/assignment/assignment-files?substring=Final_destination`
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
  submitAssignment: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/assignment/submit",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  getAiFeedback: async (data: {fileUrl:string}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/assignment/get-feedback?substring=${data.fileUrl}`
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
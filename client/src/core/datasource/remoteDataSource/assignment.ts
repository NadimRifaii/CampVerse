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
  getAssignmentFiles: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/files/assignmentSEC Results 4.pdf`
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
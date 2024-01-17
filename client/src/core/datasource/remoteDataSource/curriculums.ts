import { sendRequest } from "../../helpers/request"

export const curriculumsDataSource = {
  getCurriculums: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/curriculum",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
import { sendRequest } from "@renderer/core/helpers/request"

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
      throw new Error(error)
    }
  },
  addCurriculumToBootcamp: async (data: {}) => {
    console.log(data)
    try {
      const response = await sendRequest({
        body: data,
        route: "/curriculum/add-to-bootcamp",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
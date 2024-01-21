import { sendRequest } from "../../helpers/request";

export const resultsDatasource = {
  getBootcampResults: async (data: { bootcampId: number }) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/result/${data.bootcampId}`,
        method: "GET"
      })
      const results: any = []
      for (let result of response.results) {
        const { week } = result
        const grades: any = []
        for (let gradex of result.Grades) {
          const { User, Stack: { name: stackName }, grade } = gradex
          grades.push({ User, stackName, grade })
        }
        results.push({ week, grades })
      }
      return { results }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
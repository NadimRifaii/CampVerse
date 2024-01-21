import { sendRequest } from "../../helpers/request";
export const resultsDataSource = {
  getBootcampWeeklyResults: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/result/weekly",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
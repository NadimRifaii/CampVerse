import { sendRequest } from '../../helpers/request'
export const resultsDataSource = {
  getBootcampWeeklyResults: async (data: { weekId: number }) => {
    try {
      const response = await sendRequest({
        route: `/result/${data.weekId}`,
        method: `GET`,
        body: data
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
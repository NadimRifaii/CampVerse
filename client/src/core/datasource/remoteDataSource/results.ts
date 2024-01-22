import { sendRequest } from '../../helpers/request'
import { Request } from '../../../components/createResultTable/create-result-table.component'
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
  },
  getUserWeeklyResults: async (data: { userId: number, weekId: number }) => {
    console.log(data)
    try {
      const response = await sendRequest({
        route: `/result/user-results/${data.weekId}`,
        method: "POST",
        body: data
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  createWeeklyResults: async (data: { results: Request[] }, weekId: number) => {
    try {
      const response = await sendRequest({
        route: `/result/${weekId}`,
        method: `POST`,
        body: data
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
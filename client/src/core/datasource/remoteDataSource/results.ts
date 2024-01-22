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
  createWeeklyResults: async (data: { weekId: number, results: Request[] }) => {
    try {
      const response = await sendRequest({
        route: `/result/${data.weekId}`,
        method: `POST`,
        body: data.results
      })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
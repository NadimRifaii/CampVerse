import { sendRequest } from "@renderer/core/helpers/request"

export const bootcampsDataSource = {
  getSchedule: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/schedule-days",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
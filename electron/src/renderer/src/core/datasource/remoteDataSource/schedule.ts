import { sendRequest } from "@renderer/core/helpers/request"

export const scheduleDataSource = {
  getSchedule: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/schedule/bootcamp-schedule",
        method: "POST"
      })

      return response.schedule
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
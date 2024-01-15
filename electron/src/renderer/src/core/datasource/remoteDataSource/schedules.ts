import { sendRequest } from "@renderer/core/helpers/request";
export const schedulesDataSource = {
  getBootcampSchedules: async (data: { id: number }) => {
    try {
      const response = await sendRequest({
        body: data,
        route: `/schedule/bootcamp-schedule/${data.id}`,
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
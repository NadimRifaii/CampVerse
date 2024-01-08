import { sendRequest } from "@renderer/core/helpers/request"

export const bootcampsDataSource = {
  getBootcamps: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/bootcamp",
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
}
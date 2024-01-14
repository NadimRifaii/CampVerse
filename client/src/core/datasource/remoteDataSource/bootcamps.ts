import { sendRequest } from "../../helpers/request"

export const bootcampsDataSource = {
  getUserBootcamps: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/bootcamp/user-bootcamps",
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
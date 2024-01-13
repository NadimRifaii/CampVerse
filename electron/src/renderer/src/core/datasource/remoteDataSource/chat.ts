import { sendRequest } from "@renderer/core/helpers/request"

export const authDataSource = {
  login: async (data: {}) => {
    try {
      const response = await sendRequest({
        body: data,
        route: "/auth/login",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
}
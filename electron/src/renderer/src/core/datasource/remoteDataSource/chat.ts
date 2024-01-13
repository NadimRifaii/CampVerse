import { messagesRequest } from "@renderer/core/helpers/request"

export const messagesDataSource = {
  fetchMessages: async (data: {}) => {
    try {
      const response = await messagesRequest({
        body: data,
        route: "/api/chat",
        method: "GET"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  },
}
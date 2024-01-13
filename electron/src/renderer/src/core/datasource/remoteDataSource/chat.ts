import { messagesRequest } from "@renderer/core/helpers/request"

export const messagesDataSource = {
  accessChat: async (data: {}) => {
    try {
      const response = await messagesRequest({
        body: data,
        route: "/api/chat",
        method: "POST"
      })
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
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
  },
  getChatMessages: async (data: { chatId: string }) => {
    try {
      const response = await messagesRequest({
        body: data,
        route: `/api/message/${data.chatId}`
      })
      return response.messages
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
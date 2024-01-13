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
        route: `/api/message/${data.chatId}`,
        method: "GET"
      })
      return response.messages
    } catch (error: any) {
      throw new Error(error)
    }
  },
  sendMessage: async (data: {}) => {
    try {
      const response = await messagesRequest({
        body: data,
        route: `/api/message`,
        method: "POST"
      })
      console.log(response)
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
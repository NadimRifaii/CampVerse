import { messagesRequest } from "@renderer/core/helpers/request"

export const messagesDataSource = {
  accessChat: async (data: {}) => {
    try {
      const response = await messagesRequest({
        body: data,
        route: "/api/chat",
        method: "POST"
      })
      const { _id, chatName, users, latestMessage } = response
      console.log({
        _id,
        chatName,
        users,
        latestMessage
      })
      // return response
      return {
        _id,
        chatName,
        users,
        latestMessage
      }
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
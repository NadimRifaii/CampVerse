
import { messagesRequest } from "../../helpers/request"
export const messagesDataSource = {
  accessChat: async (data: { currentUser: {} }) => {
    console.log("########################")
    console.log(data)
    console.log("########################")
    try {
      const response = await messagesRequest({
        body: data.currentUser,
        route: "/api/chat",
        method: "POST"
      })
      const { _id, chatName, users, latestMessage } = response
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
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
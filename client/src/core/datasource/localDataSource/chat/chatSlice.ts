import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../../types/user'
import { RootState } from '../../../types/rootState'
import { ChatType } from '../../../types/chatType'


const initialState = {
  chat: {

  }

}
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatX(state, { type, payload }: { payload: ChatType, type: string }) {
      return {
        chat: payload
      }
    },
    removeChat(state, { type, payload }: { payload: any, type: string }) {
      return {
        chat: {}
      }
    }
  }
})
export const { setChatX, removeChat } = chatSlice.actions
export const chat = chatSlice.name
export default chatSlice.reducer
export const extractChatSlice = (global: RootState) => {
  return global[chat]
}
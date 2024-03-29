import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../../types/user'
import { RootState } from '../../../types/rootState'

const initialState: User = {
  id: 0,
  UserId: 0,
  username: "",
  email: "",
  role: "student",
  profilePicture: "",
  firstname: "",
  lastname: "",
  position: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { type, payload }: { payload: User, type: string }) {
      return {
        ...payload
      }
    },
    updateUser(state, { type, payload }: { payload: any, type: string }) {
      return {
        ...state, ...payload
      }
    },
    removeUser(state, { type, payload }: { payload: any, type: string }) {
      return {
        ...initialState
      }
    }
  }
})
export const { setUser, updateUser, removeUser } = userSlice.actions
export const user = userSlice.name
export default userSlice.reducer
export const extractUserSlice = (global: RootState) => {
  return global[user]
}
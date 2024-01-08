import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@renderer/core/types/rootState'
import { User } from '@renderer/core/types/user'


const initialState: User = {
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
    }
  }
})
export const { setUser, updateUser } = userSlice.actions
export const user = userSlice.name
export default userSlice.reducer
export const extractUserSlice = (global: RootState) => {
  return global[user]
}
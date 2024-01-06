import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../../types/user'
import { RootState } from '../../../types/rootState'

const initialState: User = {
  role: "",
  username: "",
  email: "",
  profilePicture: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { type, payload }: { payload: User, type: string }) {
      const { username, email, role, profilePicture } = payload
      return {
        username, email, role, profilePicture
      }
    }
  }
})
export const { setUser } = userSlice.actions
export const user = userSlice.name
export default userSlice.reducer
export const extractUserSlice = (global: RootState) => {
  return global[user]
}
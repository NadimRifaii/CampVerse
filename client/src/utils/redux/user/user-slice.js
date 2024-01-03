import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: "",
  username: "",
  email: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { username, email, role } = action.payload
      return {
        username, email, role
      }
    }
  }
})
export const { setUser } = userSlice.actions
export const user = userSlice.name
export default userSlice.reducer
export const extractUserSlice = (global) => {
  return global[user]
}
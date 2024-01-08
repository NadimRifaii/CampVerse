import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@renderer/core/types/rootState'

const initialState = {
  users: []
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, { type, payload }: { payload: any, type: string }) {
      return {
        ...payload
      }
    }
  }
})
export const { setUsers } = usersSlice.actions
export const users = usersSlice.name
export default usersSlice.reducer
export const extractUsersSlice = (global: RootState) => {
  return global[users]
}
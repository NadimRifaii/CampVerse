import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../types/rootState';
import { User } from '../../../types/user';
export type UsersSliceType = {
  students: User[],
  mentors: User[]
}
const initialState: UsersSliceType = {
  students: [],
  mentors: []
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, { type, payload }: { payload: UsersSliceType, type: string }) {
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
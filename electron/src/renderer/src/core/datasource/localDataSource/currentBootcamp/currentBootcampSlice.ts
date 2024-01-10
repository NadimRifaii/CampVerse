import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@renderer/core/types/rootState'

const initialState = {
  currentBootcamp: {}
};
export const currentBootcampSlice = createSlice({
  name: "currentBootcamp",
  initialState,
  reducers: {
    setcurrentBootcamp(state, { type, payload }: { payload: any, type: string }) {
      return {
        ...payload
      }
    }
  }
})
export const { setcurrentBootcamp } = currentBootcampSlice.actions
export const currentBootcamp = currentBootcampSlice.name
export default currentBootcampSlice.reducer
export const extractcurrentBootcampSlice = (global: RootState) => {
  return global[currentBootcamp]
}
import { createSlice } from '@reduxjs/toolkit'
import { Bootcamp } from '@renderer/core/types/bootcamp';
import { RootState } from '@renderer/core/types/rootState'
export type CurrentBootcampType = {
  currentBootcamp: Bootcamp
}
const initialState: CurrentBootcampType = {
  currentBootcamp: {
    id: 0,
    name: "",
    audience: "",
    outcomes: "",
    stacks: [],
    students: [],
    mentors: []
  }
}
export const currentBootcampSlice = createSlice({
  name: "currentBootcamp",
  initialState,
  reducers: {
    setcurrentBootcamp(state, { type, payload }: { payload: any, type: string }) {
      return {
        currentBootcamp: payload
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
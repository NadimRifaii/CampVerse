import { createSlice } from '@reduxjs/toolkit'
import { Bootcamp } from '../../../types/bootcamp'
import { RootState } from '../../../types/rootState'
export type CurrentBootcampType = {
  currentBootcamp: Bootcamp
}
const initialState: CurrentBootcampType = {
  currentBootcamp: {
    id: 0,
    name: "",
    audience: "",
    outcomes: "",
    numberOfWeeks: 0,
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
    },
    removeCurrentBootcamp(state, { type, payload }: { payload: any, type: string }) {
      return {
        currentBootcamp: {
          id: 0,
          name: "",
          audience: "",
          outcomes: "",
          numberOfWeeks: 0,
          stacks: [],
          students: [],
          mentors: []
        }
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
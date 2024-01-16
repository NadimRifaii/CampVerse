import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../types/rootState";
type ScheduleType = {
  bootcampId: number,
  initialDate: number,
  sessions: Event[]
}
export type SchedulesSliceType = {
  schedules: ScheduleType[]
}
const initialState: SchedulesSliceType = {
  schedules: []
}
export const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    setSchedules(prevState, { type, payload }: { payload: ScheduleType[], type: string }) {
      return {
        schedules: payload
      }
    },
  }
})
export const { setSchedules } = schedulesSlice.actions
export const schedules = schedulesSlice.name
export default schedulesSlice.reducer
export const extractSchedulesSlice = (global: RootState) => {
  return global[schedules]
}
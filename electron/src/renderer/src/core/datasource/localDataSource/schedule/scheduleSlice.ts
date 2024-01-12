import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@renderer/core/types/rootState";
export type Session = {
  title: string,
  startTime: string,
  endTime: string,
}
export type Day = {
  day: string,
  sessions: Session[]
}
export type Schedule = {
  bootcampID: number,
  week: string,
  days: Day[]
}
export type ScheduleSliceType = {
  schedule: Schedule
}
const initialState: ScheduleSliceType = {
  schedule: {
    bootcampID: 0,
    week: "",
    days: []
  }
}
export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule(state, { type, payload }: { payload: any, type: string }) {
      return {
        schedule: payload
      }
    }
  }
})
export const { setSchedule } = scheduleSlice.actions
export const schedule = scheduleSlice.name
export default scheduleSlice.reducer
export const extractCurriculumsSlice = (global: RootState) => {
  return global[schedule]
}
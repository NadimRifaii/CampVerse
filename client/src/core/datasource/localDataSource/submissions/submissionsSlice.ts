import { createSlice } from '@reduxjs/toolkit'
import { Assignment, AssignmentFile } from '../assignments/assignmentsSlice'
import { RootState } from '../../../types/rootState'

export type submissionType = {
  stackId: number,
  studentId: number,
  assignmentId: number,
  submitedAt: string,
  assignmentDueDate: string,
  assignment: any
}
export type submissionsSliceType = {
  submissions: submissionType[]
}
const initialState: submissionsSliceType = {
  submissions: []
}
export const submissionsSlice = createSlice({
  initialState,
  name: "submissions",
  reducers: {
    setSubmissions(state, { type, payload }: { payload: submissionType[], type: string }) {
      return {
        submissions: payload
      }
    }
  }
})
export const { setSubmissions } = submissionsSlice.actions
export const submissions = submissionsSlice.name
export default submissionsSlice.reducer
export const extractSubmissionsSlice = (global: RootState) => {
  return global[submissions]
}
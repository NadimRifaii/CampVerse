import { createSlice } from '@reduxjs/toolkit'
import { AssignmentFile } from '../assignments/assignmentsSlice'

type submissionType = {
  stackId: number,
  studentId: number,
  assignmentId: number,
  submitedAt: string,
  assignmentDueDate: string
}
type submissionsSliceType = {
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
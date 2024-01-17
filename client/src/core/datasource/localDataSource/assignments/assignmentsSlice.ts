import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../types/rootState';
type AssignmentFile = {
  fileName: string,
  fileType: string,
  fileUrl: string
}
type Instruction = {
  instructionTitle: string,
  content: string,
}
type Assignment = {
  title: string,
  dueDate: string,
  stackName: string,
  assignmentFiles: AssignmentFile[],
  instructions: Instruction[]
}
export type AssignmentsSliceType = {
  assignments: Assignment[]
}
const initialState: AssignmentsSliceType = {
  assignments: []
};
export const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments(state, { type, payload }: { payload: AssignmentsSliceType, type: string }) {
      return {
        ...payload
      }
    }
  }
})
export const { setAssignments } = assignmentsSlice.actions
export const assignments = assignmentsSlice.name
export default assignmentsSlice.reducer
export const extractBootcampsSlice = (global: RootState) => {
  return global[assignments]
}
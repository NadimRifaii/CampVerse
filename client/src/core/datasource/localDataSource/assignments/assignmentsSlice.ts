import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../types/rootState';
export type File = {
  fileName: string,
  fileType: string,
  fileUrl: string
}
type Instruction = {
  instructionTitle: string,
  content: string,
}
export type Assignment = {
  ID: number,
  assignmentTitle: string,
  dueDate: string,
  stackName: string,
  assignmentFiles: File[],
  instructions: Instruction[],
  submissionsFiles?: []
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
    setAssignments(state, { type, payload }: { payload: Assignment[], type: string }) {
      console.log("akdsljf")
      return {
        assignments: payload
      }
    }
  }
})
export const { setAssignments } = assignmentsSlice.actions
export const assignments = assignmentsSlice.name
export default assignmentsSlice.reducer
export const extractAssignmentsSlice = (global: RootState) => {
  return global[assignments]
}
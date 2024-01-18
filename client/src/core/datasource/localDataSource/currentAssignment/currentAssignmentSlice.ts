import { createSlice } from '@reduxjs/toolkit'
import { Assignment } from '../assignments/assignmentsSlice'
import { RootState } from '../../../types/rootState'
export type CurrentAssigmnentSliceType = {
  assignment: Assignment
}
const initialState: CurrentAssigmnentSliceType = {
  assignment: {
    assignmentTitle: '',
    dueDate: '',
    stackName: '',
    instructions: [],
    assignmentFiles: []
  }
}
export const currentAssignmentSlice = createSlice(
  {
    name: "currentAssignment",
    initialState,
    reducers: {
      setCurrentAssignment(state, { type, payload }: { type: string, payload: Assignment }) {
        return {
          assignment: payload
        }
      }
    }
  }
)
export const { setCurrentAssignment } = currentAssignmentSlice.actions
export const currentAssignment = currentAssignmentSlice.name
export default currentAssignmentSlice.reducer
export const extractCurrentAssignmentSlice = (global: RootState) => {
  return global[currentAssignment]
}
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/user";
import { RootState } from "../../../types/rootState";
type Grade = {
  User: User,
  grade: number,
  stackName: string
}
type Result = {
  week: string,
  grades: Grade[]
}
export type ResultsSliceType = {
  results: Result[]
}
const initialState: ResultsSliceType = {
  results: []
}
export const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults(prevState, { type, payload }: { payload: ResultsSliceType, type: string }) {
      return {
        ...payload
      }
    },
  }
})
export const { setResults } = resultsSlice.actions
export const results = resultsSlice.name
export default resultsSlice.reducer
export const extractResultsSlice = (global: RootState) => {
  return global[results]
}
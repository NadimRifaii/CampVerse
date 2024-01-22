import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/user";
import { RootState } from "../../../types/rootState";

export type Grade = {
  stackName: string,
  score: number
}
export type Result = {
  User: User,
  grades: Grade[],
  weekId: number
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
    setResults(state, { type, payload }: { type: string, payload: Result[] }) {
      return {
        results: payload
      }
    }
  }
})
export const { setResults } = resultsSlice.actions
export const results = resultsSlice.name
export default resultsSlice.reducer
export const extractResultsSlice = (global: RootState) => {
  return global[results]
}
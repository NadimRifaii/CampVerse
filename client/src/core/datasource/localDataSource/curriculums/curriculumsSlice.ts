import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../types/rootState";

export type CurriculumSliceType = {
  curriculums: []
}
const initialState: CurriculumSliceType = {
  curriculums: []
}
export const curriculumsSlice = createSlice({
  name: "curriculums",
  initialState,
  reducers: {
    setCurriculums(state, { type, payload }: { payload: any, type: string }) {
      if (state && type) {

      }
      return {
        ...payload
      }
    }
  }
})
export const { setCurriculums } = curriculumsSlice.actions
export const curriculums = curriculumsSlice.name
export default curriculumsSlice.reducer
export const extractCurriculumsSlice = (global: RootState) => {
  return global[curriculums]
}
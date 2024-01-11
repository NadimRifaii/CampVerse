import { createSlice } from '@reduxjs/toolkit'
import { Bootcamp } from '@renderer/core/types/bootcamp';
import { RootState } from '@renderer/core/types/rootState'
export type BootcampsSliceType = {
  bootcamps: Bootcamp[]
}
const initialState: BootcampsSliceType = {
  bootcamps: []
};
export const bootcampsSlice = createSlice({
  name: "bootcamps",
  initialState,
  reducers: {
    setBootcamps(state, { type, payload }: { payload: any, type: string }) {
      return {
        ...payload
      }
    }
  }
})
export const { setBootcamps } = bootcampsSlice.actions
export const bootcamps = bootcampsSlice.name
export default bootcampsSlice.reducer
export const extractBootcampsSlice = (global: RootState) => {
  return global[bootcamps]
}
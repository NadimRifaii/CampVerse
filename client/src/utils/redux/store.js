import { configureStore } from "@reduxjs/toolkit";
import userSlice,{user} from './user/user-slice'
export const store = configureStore({
  reducer: {
    [user]:userSlice
  }
})
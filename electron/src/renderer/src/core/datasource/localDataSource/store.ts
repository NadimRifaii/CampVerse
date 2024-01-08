import { configureStore } from "@reduxjs/toolkit";
import userSlice, { user } from "./user/userSlice";
import bootcampsSlice, { bootcamps } from "./bootcamps/bootcampsSlice";
export const store = configureStore({
  reducer: {
    [user]: userSlice,
    [bootcamps]: bootcampsSlice
  }
})
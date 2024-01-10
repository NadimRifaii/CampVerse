import { configureStore } from "@reduxjs/toolkit";
import userSlice, { user } from "./user/userSlice";
import bootcampsSlice, { bootcamps } from "./bootcamps/bootcampsSlice";
import usersSlice, { users } from "./users/usersSlice";
import currentBootcampSlice, { currentBootcamp } from "./currentBootcamp/currentBootcampSlice";
export const store = configureStore({
  reducer: {
    [user]: userSlice,
    [bootcamps]: bootcampsSlice,
    [users]: usersSlice,
    [currentBootcamp]: currentBootcampSlice
  }
})
import { configureStore } from "@reduxjs/toolkit";
import userSlice, { user } from "./user/userSlice";
import bootcampsSlice, { bootcamps } from "./bootcamps/bootcampsSlice";
import usersSlice, { users } from "./users/usersSlice";
import currentBootcampSlice, { currentBootcamp } from "./currentBootcamp/currentBootcampSlice";
import curriculumsSlice, { curriculums } from "./curriculums/curriculumsSlice";
import scheduleSlice, { schedule } from "./schedule/scheduleSlice";
export const store = configureStore({
  reducer: {
    [user]: userSlice,
    [bootcamps]: bootcampsSlice,
    [users]: usersSlice,
    [currentBootcamp]: currentBootcampSlice,
    [curriculums]: curriculumsSlice,
    [schedule]: scheduleSlice
  }
})
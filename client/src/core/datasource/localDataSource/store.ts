import { configureStore } from "@reduxjs/toolkit";
import userSlice, { user } from './user/userSlice'
import chatSlice, { chat } from "./chat/chatSlice";
import usersSlice, { users } from "./users/usersSlice";
import bootcampsSlice, { bootcamps } from "./bootcamps/bootcampsSlice";
import currentBootcampSlice, { currentBootcamp } from "./currentBootcamp/currentBootcampSlice";
import schedulesSlice, { schedules } from "./schedules/schedulesSlice";
import curriculumsSlice, { curriculums } from "./curriculums/curriculumsSlice";
import assignmentsSlice, { assignments } from "./assignments/assignmentsSlice";
import submissionsSlice, { submissions } from "./submissions/submissionsSlice";
import currentAssignmentSlice, { currentAssignment } from "./currentAssignment/currentAssignmentSlice";

export const store = configureStore({
  reducer: {
    [user]: userSlice,
    [chat]: chatSlice,
    [users]: usersSlice,
    [bootcamps]: bootcampsSlice,
    [currentBootcamp]: currentBootcampSlice,
    [schedules]: schedulesSlice,
    [curriculums]: curriculumsSlice,
    [assignments]: assignmentsSlice,
    [submissions]: submissionsSlice,
    [currentAssignment]: currentAssignmentSlice,
  }
})
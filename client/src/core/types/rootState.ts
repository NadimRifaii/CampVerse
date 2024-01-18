import { BootcampsSliceType } from "../datasource/localDataSource/bootcamps/bootcampsSlice"
import { CurrentBootcampType } from "../datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { UsersSliceType } from "../datasource/localDataSource/users/usersSlice"
import { ChatType } from "./chatType"
import { User } from "./user"
import { SchedulesSliceType } from "../datasource/localDataSource/schedules/schedulesSlice"
import { CurriculumSliceType } from "../datasource/localDataSource/curriculums/curriculumsSlice"
import { AssignmentsSliceType } from "../datasource/localDataSource/assignments/assignmentsSlice"
import { submissionsSliceType } from "../datasource/localDataSource/submissions/submissionsSlice"
import { CurrentAssigmnentSliceType } from "../datasource/localDataSource/currentAssignment/currentAssignmentSlice"
export type RootState = {
  user: User,
  chat: ChatType,
  users: UsersSliceType,
  currentBootcamp: CurrentBootcampType,
  bootcamps: BootcampsSliceType,
  schedules: SchedulesSliceType,
  curriculums: CurriculumSliceType,
  assignments: AssignmentsSliceType,
  submissions: submissionsSliceType,
  currentAssignment: CurrentAssigmnentSliceType
}
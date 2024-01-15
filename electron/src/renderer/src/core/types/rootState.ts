import { BootcampsSliceType } from "../datasource/localDataSource/bootcamps/bootcampsSlice"
import { CurrentBootcampType } from "../datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { CurriculumSliceType } from "../datasource/localDataSource/curriculums/curriculumsSlice"
import { ScheduleSliceType } from "../datasource/localDataSource/schedule/scheduleSlice"
import { UsersSliceType } from "../datasource/localDataSource/users/usersSlice"
import { ChatType } from "./chatType"
import { User } from "./user"

export type RootState = {
  user: User,
  bootcamps: BootcampsSliceType,
  users: UsersSliceType,
  currentBootcam: CurrentBootcampType,
  curriculums: CurriculumSliceType,
  schedule: ScheduleSliceType,
  chat: ChatType,
  schedules: ScheduleSliceType
}
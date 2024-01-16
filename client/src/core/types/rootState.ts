import { BootcampsSliceType } from "../datasource/localDataSource/bootcamps/bootcampsSlice"
import { CurrentBootcampType } from "../datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { UsersSliceType } from "../datasource/localDataSource/users/usersSlice"
import { ChatType } from "./chatType"
import { User } from "./user"
import { SchedulesSliceType } from "../datasource/localDataSource/schedules/schedulesSlice"
export type RootState = {
  user: User,
  chat: ChatType,
  users: UsersSliceType,
  currentBootcamp: CurrentBootcampType,
  bootcamps: BootcampsSliceType,
  schedules: SchedulesSliceType
}
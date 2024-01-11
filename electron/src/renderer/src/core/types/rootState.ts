import { BootcampsSliceType } from "../datasource/localDataSource/bootcamps/bootcampsSlice"
import { CurrentBootcampType } from "../datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { UsersSliceType } from "../datasource/localDataSource/users/usersSlice"
import { User } from "./user"

export type RootState = {

  user: User,
  bootcamps: BootcampsSliceType,
  users: UsersSliceType,
  currentBootcam: CurrentBootcampType
}
import { BootcampsSliceType } from "../datasource/localDataSource/bootcamps/bootcampsSlice"
import { UsersSliceType } from "../datasource/localDataSource/users/usersSlice"
import { Bootcamp } from "./bootcamp"
import { User } from "./user"

export type RootState = {

  user: User,
  bootcamps: BootcampsSliceType,
  users: UsersSliceType,
  currentBootcam: Bootcamp
}
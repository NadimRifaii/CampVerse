import { User } from "./user"

export type RootState = {
  user: User,
  bootcamps: [],
  users: User[]
}
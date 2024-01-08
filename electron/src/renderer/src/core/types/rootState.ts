import { Bootcamp } from "./bootcamp"
import { User } from "./user"

export type RootState = {
  user: User,
  bootcamps: Bootcamp[]
}
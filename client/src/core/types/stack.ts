// import { Bootcamp } from "./bootcamp"
import { User } from "./user"

export type Stack = {
  id: number,
  name: string,
  // bootcamps: Bootcamp[],
  mentors: User[]
}
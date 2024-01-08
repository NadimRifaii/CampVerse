import { User } from "./user"

export type Bootcamp = {
  id: number,
  name: string,
  outcomes: string,
  audience: string,
  users: User[]
}
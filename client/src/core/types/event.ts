import { User } from "./user"

export type Event = {
  startDate: string,
  endDate: string,
  users: User[]
}
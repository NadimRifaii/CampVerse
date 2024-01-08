import { User } from "./user"
import { Stack } from "./stack"
export type Bootcamp = {
  id: number,
  name: string,
  outcomes: string,
  audience: string,
  users: User[],
  stacks: Stack[]
}
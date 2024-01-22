import { Stack } from "./stack"
type Week = {
  ID: number
}
export type Bootcamp = {
  id: number,
  name: string,
  outcomes: string,
  audience: string,
  numberOfWeeks: number,
  mentors: [],
  students: [],
  stacks: Stack[],
  weeks: Week[]
}
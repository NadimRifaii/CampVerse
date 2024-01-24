import { Stack } from "./stack"
export type Bootcamp = {
  id: number,
  name: string,
  outcomes: string,
  audience: string,
  numberOfWeeks: number,
  mentors: [],
  students: [],
  stacks: Stack[],
  weeks: []
}
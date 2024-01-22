import { useState } from "react"
import { Stack } from "../../core/types/stack"

import { Request } from "./create-result-table.component"
const useLogic = () => {
  const [request, setRequest] = useState<Request[]>([])
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, stack: Stack, sId: number) => {
    setRequest((prevState) => {
      const studentIndex = prevState.findIndex((student, index) => {
        return student.id == sId
      })
      const studentGrades = prevState[studentIndex].grades
      studentGrades.map((studentGrade, index) => {
        if (studentGrade.stackId === stack.ID) {
          studentGrade.score = +event.target.value
        }
      })
      return [...prevState]
    })
  }
  return { request, setRequest, changeHandler }
}
export default useLogic
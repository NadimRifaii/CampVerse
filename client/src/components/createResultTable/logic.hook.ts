import { useState } from "react"
import { Stack } from "../../core/types/stack"
import { Request } from "./create-result-table.component"
import { resultsDataSource } from "../../core/datasource/remoteDataSource/results"
const useLogic = (currentWeek: number) => {
  const [request, setRequest] = useState<Request[]>([])
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, stack: Stack, sId: number) => {
    setRequest((prevState) => {
      const studentIndex = prevState.findIndex((student, index) => {
        return student.userId == sId
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
  const createWeeklyResults = async () => {
    console.log(request)
    try {
      const response = await resultsDataSource.createWeeklyResults({ results: request }, currentWeek)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return { request, setRequest, changeHandler, createWeeklyResults }
}
export default useLogic
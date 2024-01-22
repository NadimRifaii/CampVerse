import { useState } from "react"
import { Stack } from "../../core/types/stack"
import { Request } from "./create-result-table.component"
import { resultsDataSource } from "../../core/datasource/remoteDataSource/results"
import toast from "react-hot-toast"
const useLogic = (currentWeek: number, getBootcampWeeklyResults: () => Promise<void>) => {
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
    const loadingToastId = toast.loading('Creating the result...');
    try {
      const response = await resultsDataSource.createWeeklyResults({ results: request }, currentWeek)
      toast.success(`Result created successfully!`, { id: loadingToastId })
      await getBootcampWeeklyResults()
    } catch (error: any) {
      toast.error(`${error.message}`, { id: loadingToastId });
    }
  }
  return { request, setRequest, changeHandler, createWeeklyResults }
}
export default useLogic
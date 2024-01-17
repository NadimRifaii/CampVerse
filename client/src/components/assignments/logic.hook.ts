import { useSelector } from "react-redux"
import { extractAssignmentsSlice } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
import { useEffect } from "react"

const useLogic = () => {
  const { assignments } = useSelector(extractAssignmentsSlice)
  useEffect(() => {
    console.log(assignments)
  }, [])
}
export default useLogic
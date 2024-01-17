import { useEffect } from "react"
import { Assignment } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
type AssignmentCardProps = {
  assignment: Assignment
}
const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  useEffect(() => {
    console.log(assignment)
  }, [])
  return (
    <h1>Hello</h1>
  )
}
export default AssignmentCard
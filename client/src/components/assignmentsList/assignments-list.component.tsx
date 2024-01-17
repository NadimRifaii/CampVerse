import { useEffect } from "react"
import { Assignment } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
import AssignmentCard from "../assignmentCard/assignment-card.component"
type AssignmentsListProps = {
  assignments: Assignment[]
}
const AssignmentsList = ({ assignments }: AssignmentsListProps) => {
  useEffect(() => {
    console.log(assignments)
  }, [assignments])
  return (
    <div className="assignments-list-container">
      {
        assignments.map((assignment, index) => {
          return <AssignmentCard key={index} assignment={assignment} />
        })
      }
    </div>
  )
}
export default AssignmentsList
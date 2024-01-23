import { useEffect } from "react"
import { Assignment } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
import AssignmentCard from "../assignmentCard/assignment-card.component"
import EmptyState1 from "../../assets/EmptyState1"
import './assignments-list.styles.css'
import { User } from "../../core/types/user"
import EmptyState3 from "../../assets/EmptyState3"
type AssignmentsListProps = {
  assignments: Assignment[],
  user: User,
  fetchBootcampAssignments: () => Promise<void>
}

const AssignmentsList = ({ assignments, fetchBootcampAssignments, user }: AssignmentsListProps) => {
  return (
    <div className="assignments-list-container">
      {
        user.role == "student" && assignments.length == 0 ? <EmptyState1 handleClick={() => {
          fetchBootcampAssignments()
        }} /> :
          user.role == "mentor" && assignments.length == 0 ? <EmptyState3 /> :
            assignments.map((assignment, index) => {
              return <AssignmentCard key={index} assignment={assignment} />
            })
      }
    </div>
  )
}
export default AssignmentsList
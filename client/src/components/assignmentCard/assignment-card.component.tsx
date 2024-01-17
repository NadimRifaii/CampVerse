import { useEffect } from "react"
import { Assignment } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
import './assignment-card-styles.css'
import AssignmentsIcon from "../../assets/assignments-icon.component"
type AssignmentCardProps = {
  assignment: Assignment
}
const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  useEffect(() => {
    console.log(assignment)
  }, [])
  return (
    <div className="assignment-card">
      <div className="icon">
        <AssignmentsIcon />
      </div>
      <div className="title">
        {assignment.title}
      </div>
      <div className="progress-bar">
        <div className="bar">
          <span></span>
        </div>
      </div>
      <div className="stat">
        76% Submited
      </div>
    </div>
  )
}
export default AssignmentCard
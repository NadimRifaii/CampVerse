import { useEffect } from "react"
import { Assignment } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
import './assignment-card-styles.css'
import AssignmentsIcon from "../../assets/assignments-icon.component"
import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
type AssignmentCardProps = {
  assignment: Assignment,
  status?: string
}
const AssignmentCard = ({ assignment, status = "" }: AssignmentCardProps) => {
  const user = useSelector(extractUserSlice)
  useEffect(() => {
    console.log(assignment)
  }, [])
  return (
    <div className="assignment-card">
      <div className="header">
        <h2>Assignment</h2>
      </div>
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
      {
        user.role == "mentor" ?
          <div className="stat">
            76% Submited
          </div> :
          <div className="status">

          </div>
      }
    </div>
  )
}
export default AssignmentCard
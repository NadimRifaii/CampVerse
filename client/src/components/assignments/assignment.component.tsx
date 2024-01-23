import { Button } from "../common/button/button.component"
import CreateAssignment from "../createAssignment/create-assignment.controller"
import { useEffect, useState } from "react"
import './assignments.styles.css'
import useLogic from "./logic.hook"
import AssignmentsList from "../assignmentsList/assignments-list.component"
import Submissions from "../submissions/submissions.component"
const Assignment = () => {
  const [currentActiveComponent, setCurrentActiveComponent] = useState<string>("old")
  const { assignments, oldAssignments, upcomingAssignments, user, fetchBootcampAssignments } = useLogic()
  return (
    <div className="assignments-section">
      <div className="toggler-header">
        {
          user.role == "student" &&
          <Button text="Submissions" handleClick={() => setCurrentActiveComponent('submissions')} className={`${currentActiveComponent == "submissions" ? 'active' : ''}`} />
        }
        <Button text="Old" handleClick={() => setCurrentActiveComponent('old')} className={`${currentActiveComponent == "old" ? 'active' : ""}`} />
        <Button text="In progress" handleClick={() => setCurrentActiveComponent('progress')} className={`${currentActiveComponent == "progress" ? 'active' : ""}`} />
        {
          user.role == "mentor" &&
          <Button text="Create" handleClick={() => setCurrentActiveComponent('create')} className={`${currentActiveComponent == "create" ? 'active' : ""}`} />
        }
      </div>
      {
        user.role == "student" ? currentActiveComponent == "submissions" ? <Submissions /> : currentActiveComponent == "old" ? <AssignmentsList assignments={oldAssignments} />
          : <AssignmentsList assignments={upcomingAssignments} /> :
          currentActiveComponent == "create" ? <CreateAssignment fetchBootcampAssignments={fetchBootcampAssignments} /> :
            <AssignmentsList assignments={currentActiveComponent == 'old' ? oldAssignments : upcomingAssignments} />
      }
    </div>
  )
}
export default Assignment
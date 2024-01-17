import { Button } from "../common/button/button.component"
import CreateAssignment from "../createAssignment/create-assignment.controller"
import { useState } from "react"
import './assignments.styles.css'
import useLogic from "./logic.hook"
import AssignmentsList from "../assignmentsList/assignments-list.component"
const Assignment = () => {
  const [currentActiveComponent, setCurrentActiveComponent] = useState<string>("create")
  const { assignments, oldAssignments, upcomingAssignments } = useLogic()
  return (
    <div className="assignments-section">
      <div className="toggler-header">
        <Button text="Old" handleClick={() => setCurrentActiveComponent('old')} className={`${currentActiveComponent == "old" ? 'active' : ""}`} />
        <Button text="In progress" handleClick={() => setCurrentActiveComponent('progress')} className={`${currentActiveComponent == "progress" ? 'active' : ""}`} />
        <Button text="Create" handleClick={() => setCurrentActiveComponent('create')} className={`${currentActiveComponent == "create" ? 'active' : ""}`} />
      </div>
      {
        currentActiveComponent == "create" ? <CreateAssignment /> : <AssignmentsList assignments={currentActiveComponent == 'old' ? oldAssignments : upcomingAssignments} />
      }

    </div>
  )
}
export default Assignment
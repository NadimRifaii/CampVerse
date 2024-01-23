import { useEffect } from "react"
import useLogic from "./logic.hook"
import SubmissionCard from "../submissionCard/submission-card.component"
import './submissions.style.css'
import EmptyState2 from "../../assets/EmptyState2"
const Submissions = () => {
  const { submissions } = useLogic()
  return (
    <div className="submissions">
      {
        submissions.length == 0 ? <EmptyState2 /> :
          submissions.map((submission, index) => {
            const { submitedAt, assignment: { assignmentTitle, dueDate, ID } } = submission
            const submissionObj: any = { submitedAt, assignmentTitle, dueDate, ID }
            return <SubmissionCard key={index} submission={submissionObj} />
          })
      }
    </div>
  )
}
export default Submissions
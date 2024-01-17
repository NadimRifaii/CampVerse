import { useEffect } from "react"
import useLogic from "./logic.hook"
import SubmissionCard from "../submissionCard/submission-card.component"
import './submissions.style.css'
const Submissions = () => {
  const { submissions } = useLogic()
  return (
    <div className="submissions">
      {
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
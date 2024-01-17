import { useEffect } from "react"
import { submissionType } from "../../core/datasource/localDataSource/submissions/submissionsSlice"
import './submission-card.styles.css'
import AssignmentsIcon from "../../assets/assignments-icon.component"
type SubmissionCardType = {
  submission: {
    dueDate: string,
    submitedAt: string,
    assignmentTitle: string,
    ID: number
  }
}

const SubmissionCard = ({ submission }: SubmissionCardType) => {
  useEffect(() => {
    console.log(submission)
  }, [])
  return (
    <div className="submission-card">
      <div className="header">
        <h2>Assignment</h2>
      </div>
      <div className="icon">
        <AssignmentsIcon />
      </div>
      <div className="title">
        {submission.assignmentTitle}
      </div>
    </div>
  )
}
export default SubmissionCard
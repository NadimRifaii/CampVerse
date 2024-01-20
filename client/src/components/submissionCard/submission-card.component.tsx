import { useEffect, useState } from "react"
import { submissionType } from "../../core/datasource/localDataSource/submissions/submissionsSlice"
import './submission-card.styles.css'
import AssignmentsIcon from "../../assets/assignments-icon.component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faT } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
type SubmissionCardType = {
  submission: {
    dueDate: string,
    submitedAt: string,
    assignmentTitle: string,
    ID: number
  }
}

const SubmissionCard = ({ submission }: SubmissionCardType) => {
  return (
    <div className="submission-card">
      <div className="header">
        <h3>Assignment</h3>
      </div>
      <div className="icon">
        <AssignmentsIcon />
      </div>
      <div className="title">
        {submission.assignmentTitle}
      </div>
      {
        new Date(submission.submitedAt) > new Date(submission.dueDate) ?
          <div className="missed">
            <FontAwesomeIcon icon={faTimes} />
            <span>Missed</span>
          </div> :
          <div className="done">
            <FontAwesomeIcon icon={faCheck} />
            <span>Done</span>
          </div>
      }
    </div>
  )
}
export default SubmissionCard
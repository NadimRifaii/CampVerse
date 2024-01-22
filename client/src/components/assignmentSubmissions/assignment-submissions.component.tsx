import useLogic from "./logic.hook"
import './assignment-submissions.styles.css'
import { Button } from "../common/button/button.component";
import { useEffect, useState } from "react";
import Datetime from 'react-datetime';
import FilesContainer from "../filesContainer/files-container.component";
import { submissionType } from "../../core/datasource/localDataSource/submissions/submissionsSlice";
import InstructionsContainer from "../instructionsContainer/instructions-container.component";
const AssignmentSubmissions = () => {

  const { submissions, currentAssignment, feedback, setFeedback, getAiFeedback } = useLogic()
  const [activeSubmission, setActiveSubmission] = useState<boolean>(false)
  const [currentSubmission, setCurrentSubmission] = useState<submissionType>()
  const formattedDueDate = (dueDate: any) => {
    const date = new Date(dueDate);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long' as const,
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  return (
    <div className={`assignment-submissions-container ${activeSubmission ? "active" : ''}  `}>
      <h2>Submissions for <span>{currentAssignment.assignmentTitle}</span></h2>
      <div className="ai-feedback">
        <div className="assignment-info">
          <div className="title">
            <input type='text' value={currentAssignment.assignmentTitle} disabled />
          </div>
          <div className="due-date">
            <input type="text" disabled value={currentAssignment.dueDate} />
          </div>
          <div className="stack-name">
            <input type="text" value={currentAssignment.stackName} disabled />
          </div>
        </div>
        <InstructionsContainer instructions={currentAssignment.instructions} disabled={true} />
        <div className="files">
          <h2>Click to download student submission filess</h2>
          {
            currentSubmission && currentSubmission.SubmissionFiles && <FilesContainer files={currentSubmission.SubmissionFiles} />
          }
          <div className="ai-response">
            <textarea value={feedback} disabled placeholder="Ai feedback"></textarea>
          </div>
        </div>
        <div className="buttons-container">
          <Button text="Get feedback" handleClick={() => {
            if (currentSubmission?.SubmissionFiles?.[0]) {
              getAiFeedback(currentSubmission?.SubmissionFiles?.[0].fileUrl)
            }

          }} />
          <Button text="Close" handleClick={() => {
            setFeedback("")
            setActiveSubmission(false)
          }} />
        </div>
      </div>
      <div className="submissinos-container">
        {
          submissions.map((submission, index) => {
            return (
              <div key={index} className="submission"  >
                <div className="profile">
                  <div className="image">
                    <img src={`${process.env.REACT_APP_SERVER_GO}/images/${submission.student.User.profilePicture}`} alt="" />
                  </div>
                  <div className="name">
                    {submission.student.User.username}
                  </div>
                </div>
                <div className="submitted-at">
                  <span>Submitted at: {formattedDueDate(submission.submitedAt)}</span>
                </div>
                <Button text="See submission" handleClick={() => {
                  setCurrentSubmission(submission)
                  setActiveSubmission(true)
                }} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AssignmentSubmissions
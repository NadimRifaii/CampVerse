import useLogic from "./logic.hook"
import './assignment-submissions.styles.css'
import { Button } from "../common/button/button.component";
import { useEffect, useState } from "react";
import Datetime from 'react-datetime';
import FilesContainer from "../filesContainer/files-container.component";
import { submissionType } from "../../core/datasource/localDataSource/submissions/submissionsSlice";
import InstructionsContainer from "../instructionsContainer/instructions-container.component";
const AssignmentSubmissions = () => {
  const { submissions, currentAssignment } = useLogic()
  const [activeSubmission, setActiveSubmission] = useState<boolean>(false)
  const [currentSubmission, setCurrentSubmission] = useState<submissionType>()
  const [feedback, setFeedback] = useState<string>("")
  useEffect(() => {
    console.log(currentSubmission)
  }, [currentSubmission])
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
            currentSubmission != undefined && <FilesContainer files={currentSubmission?.SubmissionFiles} />
          }
          <div className="ai-response">
            <textarea disabled placeholder="Ai feedback"></textarea>
          </div>
          <Button text="Get feedback" handleClick={() => {

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
                    <img src={`http://localhost:8000/images/${submission.student.User.profilePicture}`} alt="" />
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
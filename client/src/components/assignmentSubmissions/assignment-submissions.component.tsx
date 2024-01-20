import useLogic from "./logic.hook"
import './assignment-submissions.styles.css'
import { Button } from "../common/button/button.component";
import { useState } from "react";
import FilesContainer from "../filesContainer/files-container.component";
const AssignmentSubmissions = () => {
  const { submissions, currentAssignment } = useLogic()
  const [activeSubmission, setActiveSubmission] = useState<boolean>(false)
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
    <div className={`assignment-submissions-container  `}>
      <h2>Submissions for <span>{currentAssignment.assignmentTitle}</span></h2>
      <div className="ai-feedback">
        <h2>Hola!</h2>
      </div>
      <div className="submissinos-container">
        {
          submissions.map((submission, index) => {
            return (
              <div key={index} className="submission">
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
                <Button text="See submission" />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default AssignmentSubmissions
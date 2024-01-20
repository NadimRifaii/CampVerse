import { useEffect, useState } from "react";
import { Assignment } from "../../core/datasource/localDataSource/assignments/assignmentsSlice";
import './assignment-card-styles.css';
import AssignmentsIcon from "../../assets/assignments-icon.component";
import { useSelector, useDispatch } from "react-redux";
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice";
import { Button } from "../common/button/button.component";
import { useNavigate } from "react-router-dom";
import { setCurrentAssignment } from "../../core/datasource/localDataSource/currentAssignment/currentAssignmentSlice";
import { assignmentDataSource } from "../../core/datasource/remoteDataSource/assignment";
import { extractUsersSlice } from "../../core/datasource/localDataSource/users/usersSlice";
import { setSubmissions, extractSubmissionsSlice } from "../../core/datasource/localDataSource/submissions/submissionsSlice";
type AssignmentCardProps = {
  assignment: Assignment,
  status?: string
}

const AssignmentCard = ({ assignment, status = "" }: AssignmentCardProps) => {
  const user = useSelector(extractUserSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberOfSubmissions, setNumberOfSubmissions] = useState<number>(0);
  const { students } = useSelector(extractUsersSlice);
  const { submissions } = useSelector(extractSubmissionsSlice)
  const getNumberOfSubmissions = async () => {
    try {
      const response: any = await assignmentDataSource.getNumberOfSubmissions({ assignmentTitle: assignment.assignmentTitle });
      setNumberOfSubmissions(response.numberOfSubmissions);
      dispatch(setSubmissions(response.submisssions))
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNumberOfSubmissions();
  }, [assignment, students]);
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
  const percentageSubmitted = (numberOfSubmissions / students.length) * 100;

  return (
    <div className={`assignment-card ${user.role == "mentor" ? 'point' : ''}`} onClick={async () => {
      dispatch(setCurrentAssignment(assignment));
      if (user.role == "mentor") {
        await getNumberOfSubmissions()
        navigate("/dashboard/assignment-submissions")
      }
    }}>
      <div className="header">
        <h3>Assignment</h3>
        <span className="due-date">{formattedDueDate(assignment.dueDate)}</span>
      </div>
      <div className="icon">
        <AssignmentsIcon />
      </div>
      <div className="title">
        {assignment.assignmentTitle}
      </div>
      {
        user.role === "mentor" ?
          <>
            <div className="stat">
              {percentageSubmitted.toFixed(0)}% Submitted
            </div>
            <div className="progress-bar">
              <div className="bar" >
                <span style={{ width: `${percentageSubmitted}%` }} ></span>
              </div>
            </div>
          </>
          :
          <div className="submit-btn">
            <Button text="Submit" handleClick={() => {
              navigate("/dashboard/submit");
            }} />
          </div>
      }
    </div>
  );
};

export default AssignmentCard;

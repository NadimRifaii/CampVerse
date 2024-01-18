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

type AssignmentCardProps = {
  assignment: Assignment,
  status?: string
}

const AssignmentCard = ({ assignment, status = "" }: AssignmentCardProps) => {
  const user = useSelector(extractUserSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberOfSubmissions, setNumberOfSubmissions] = useState<number>(0);
  const { users } = useSelector(extractUsersSlice);

  useEffect(() => {
    const getNumberOfSubmissions = async () => {
      try {
        const numberOfAssignmentSubmissions = await assignmentDataSource.getNumberOfSubmissions({ assignmentTitle: assignment.assignmentTitle });
        setNumberOfSubmissions(numberOfAssignmentSubmissions);
      } catch (error) {
        console.log(error);
      }
    };
    getNumberOfSubmissions();
  }, [assignment]);

  useEffect(() => {
    console.log(assignment);
  }, []);

  const percentageSubmitted = (numberOfSubmissions / users.length) * 100;

  return (
    <div className="assignment-card" onClick={() => {
      dispatch(setCurrentAssignment(assignment));
    }}>
      <div className="header">
        <h2>Assignment</h2>
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
              {percentageSubmitted.toFixed(2)}% Submitted
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

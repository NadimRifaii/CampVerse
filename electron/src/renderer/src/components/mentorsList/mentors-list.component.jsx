import React, { useState } from "react";
import { useSelector } from "react-redux";
import './mentors-list.styles.css';
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice";
import { Button } from "../common/button/button.component";

const MentorsList = ({ setDescription, description, setMentorsListOpen }) => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice);
  const [selectedMentors, setSelectedMentors] = useState([]);

  const handleMentorClick = (mentor) => {
    // Check if the mentor is already selected
    if (!selectedMentors.includes(mentor.email)) {
      let newMentor = null;
      if (description.mentors.length == 0)
        newMentor = mentor.firstname
      else
        newMentor = description.mentors + ',' + mentor.firstname;
      const newUsers = [...description.users, { "email": mentor.email }];
      setDescription({
        mentors: newMentor,
        users: newUsers
      });

      // Add the mentor to the selectedMentors array
      setSelectedMentors([...selectedMentors, mentor.email]);
    }
  };

  const mentorRowClassName = (mentor) => {
    // Check if the mentor is in the selectedMentors array
    return selectedMentors.includes(mentor.email) ? "mentor-row selected" : "mentor-row";
  };

  return (
    <div className="mentors-list-container">
      {currentBootcamp.mentors.map((mentor, index) => (
        <div key={index} onClick={() => handleMentorClick(mentor)} className={mentorRowClassName(mentor)}>
          <div className="profile">
            <img src={`http://localhost:8000/images/${mentor.profilePicture}`} alt="" />
          </div>
          <div className="username">
            <p>{mentor.username}</p>
          </div>
        </div>
      ))}
      <div className="save-mentors">
        <Button text="Save mentors" handleClick={() => setMentorsListOpen(false)} />
      </div>
    </div>
  );
};

export default MentorsList;

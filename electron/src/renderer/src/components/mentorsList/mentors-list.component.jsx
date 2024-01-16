import { useSelector } from "react-redux"
import './mentors-list.styles.css'
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { Button } from "../common/button/button.component"
const MentorsList = ({ setDescription, description, setMentorsListOpen }) => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  return (
    <div className="mentors-list-container">
      {
        currentBootcamp.mentors.map((mentor, index) => {
          return <div key={index} onClick={() => {
            const newMentor = description.mentors + ',' + mentor.firstname
            const newUsers = [...description.users, { "email": mentor.email }]
            setDescription({
              mentors: newMentor,
              users: newUsers
            })
          }} className="mentor-row">
            <div className="profile">
              <img src={`http://localhost:8000/images/${mentor.profilePicture}`} alt="" />
            </div>
            <div className="username">
              <p>{mentor.username}</p>
            </div>
          </div>
        })
      }
      <div className="save-mentors">
        <Button text="Save mentors" handleClick={() => {
          setMentorsListOpen(false)
        }} />
      </div>
    </div>
  )
}
export default MentorsList
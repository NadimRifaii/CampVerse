import { useEffect } from 'react'
import { extractcurrentBootcampSlice } from '../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice'
import { useSelector } from 'react-redux'
const MentorsList = () => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  useEffect(() => {
    console.log(currentBootcamp)
  }, [currentBootcamp])
  return (
    <div className="mentors-list-container">
      {
        currentBootcamp?.mentors.map(mentor => {
          return (
            <div className="mentor-row">
              <div className="profile">
                <img src={`http://localhost:8000/images/${mentor.profilePicture}`} />
              </div>
              <div className="username">
                {mentor.username}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default MentorsList
import { useSelector } from "react-redux"
import { CurrentBootcampType, extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useState } from "react"
import { Button } from "../common/button/button.component"
import './bootcamp-details.styles.css'
import Users from "../users/users.component"
const BootcampDetails = () => {
  const { currentBootcamp }: CurrentBootcampType = useSelector(extractcurrentBootcampSlice)
  const [currentActiveComponent, setCurrentActiveComponent] = useState<string>('student')
  return (
    <div className="bootcamp-details-container">
      <div className="toggler-header">
        <Button text="Students" handleClick={() => setCurrentActiveComponent('student')} className={`${currentActiveComponent == "student" ? 'active' : ""}`} />
        <Button text="Mentors" handleClick={() => setCurrentActiveComponent('mentor')} className={`${currentActiveComponent == "mentor" ? 'active' : ""}`} />
        <Button text="Curriculum" handleClick={() => setCurrentActiveComponent('curriculum')} className={`${currentActiveComponent == "curriculum" ? 'active' : ""}`} />
      </div>
      <div className="details-container">
        {
          currentActiveComponent == "student" ? <Users userType={currentActiveComponent} bootcampUsers={currentBootcamp.students} showBtn="Chat" /> :
            currentActiveComponent == "mentor" ? <Users userType={currentActiveComponent} bootcampUsers={currentBootcamp.mentors} showBtn="Chat" /> :
              <h1>Curriculum</h1>
        }
      </div>
    </div>
  )
}
export default BootcampDetails
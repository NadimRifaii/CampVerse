import { useSelector } from "react-redux"
import { CurrentBootcampType, extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useEffect, useState } from "react"
import { Button } from "../common/button/button.component"
import './bootcamp-details.styles.css'
import Users from "../users/users.component"
import Curriculum from "../curriculum/curriculum.component"
import { useNavigate } from "react-router-dom"
const BootcampDetails = () => {
  const { currentBootcamp }: CurrentBootcampType = useSelector(extractcurrentBootcampSlice)
  const [currentActiveComponent, setCurrentActiveComponent] = useState<string>('student')
  const navigate = useNavigate()
  return (
    <div className="bootcamp-details-container">
      <div className="toggler-header">
        <Button text="Students" handleClick={() => setCurrentActiveComponent('student')} className={`${currentActiveComponent == "student" ? 'active' : ""}`} />
        <Button text="Mentors" handleClick={() => setCurrentActiveComponent('mentor')} className={`${currentActiveComponent == "mentor" ? 'active' : ""}`} />
        <Button text="Curriculum" handleClick={() => setCurrentActiveComponent('curriculum')} className={`${currentActiveComponent == "curriculum" ? 'active' : ""}`} />
        <Button text="Schedule" handleClick={() => navigate("/dashboard/schedule")} className={`${currentActiveComponent == "schedule" ? 'active' : ""}`} />
      </div>
      <div className="details-container">
        {currentActiveComponent === "student" ? (
          <Users userType={currentActiveComponent} showHeader={false} bootcampUsers={currentBootcamp.students} showBtn="Chat" />
        ) : currentActiveComponent === "mentor" ? (
          <Users userType={currentActiveComponent} showHeader={false} bootcampUsers={currentBootcamp.mentors} showBtn="Chat" />
        ) : currentActiveComponent === "curriculum" ? (
          <Curriculum />
        ) : (
          // <Schedule />
          ""
        )}
      </div>
    </div>
  )
}
export default BootcampDetails
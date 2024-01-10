import { useSelector } from "react-redux"
import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useEffect, useState } from "react"
import { Button } from "../common/button/button.component"
import './bootcamp-details.styles.css'
const BootcampDetails = () => {
  const currentBootcamp = useSelector(extractcurrentBootcampSlice)
  const [currentActiveComponent, setCurrentActiveComponent] = useState<string>('users')
  useEffect(() => {
    console.log(currentBootcamp)
  }, [currentBootcamp])
  return (
    <div className="bootcamp-details-container">
      <div className="toggler-header">
        <Button text="Users" handleClick={() => setCurrentActiveComponent('users')} className={`${currentActiveComponent == "users" ? 'active' : ""}`} />
        <Button text="Students" handleClick={() => setCurrentActiveComponent('students')} className={`${currentActiveComponent == "students" ? 'active' : ""}`} />
        <Button text="Curriculum" handleClick={() => setCurrentActiveComponent('curriculum')} className={`${currentActiveComponent == "curriculum" ? 'active' : ""}`} />
      </div>

    </div>
  )
}
export default BootcampDetails
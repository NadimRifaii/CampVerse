
import { useEffect, useState } from "react"
import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import useLogic from "./logic.hook"
import './weeks.styles.css'
import Schedule from "../schedule/schedule.component"
const Weeks = () => {
  const { currentBootcamp, schedule } = useLogic()
  useEffect(() => {
    console.log(schedule)
  }, [schedule])
  return (
    <div className="weeks">
      {Array.from({ length: currentBootcamp?.numberOfWeeks || 0 }, (_, index) => (
        <div key={index} className="week-box">
          <h1 >Week {index + 1}</h1>
        </div>
      ))}
      <Schedule />
    </div>
  )
}
export default Weeks
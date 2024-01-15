
import { useEffect } from "react"

import useLogic from "./logic.hook"
import './weeks.styles.css'
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
    </div>
  )
}
export default Weeks
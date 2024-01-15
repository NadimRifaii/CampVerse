import Weeks from "../weeks/weeks.component"
import Modal from 'react-modal'
import Calendar from "../calendar/big-calendar.component"
import { useState } from "react"
const Schedule = () => {
  return (
    <div className="schedule">
      {/* <Weeks /> */}
      <Calendar />
    </div>
  )
}
export default Schedule
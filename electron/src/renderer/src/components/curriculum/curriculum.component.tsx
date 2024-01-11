import { useState } from 'react'
import './curriculum.styles.css'
import Overview from '../overview/overview.component'
import Schedule from '../schedule/schedule.component'
const Curriculum = () => {
  const [currentPage, setCurrentPage] = useState("overview")
  return (
    <div className="curriculum-container">
      <div className={`overview-schedule ${currentPage == 'overview' ? '' : 'active'}`}>
        <Overview />
        <Schedule />
      </div>
      <div className={`toggler ${currentPage == 'schedule' ? 'active' : ''}`} onClick={() => {
        currentPage == "overview" ? setCurrentPage("schedule") : setCurrentPage("overview")
      }} >
        <div className="circle"></div>
      </div>
    </div>
  )
}
export default Curriculum
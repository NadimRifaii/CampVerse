import { useState } from 'react'
import './curriculum.styles.css'
import Overview from '../overview/overview.component'
import Weeks from '../weeks/weeks.component'
const Curriculum = () => {
  const [currentPage, setCurrentPage] = useState("overview")
  return (
    <div className="curriculum-container">
      <div className={`overview-schedule ${currentPage == 'overview' ? '' : 'active'}`}>
        <Overview />
        <Weeks />
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
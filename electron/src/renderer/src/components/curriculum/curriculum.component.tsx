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
      </div>
    </div>
  )
}
export default Curriculum
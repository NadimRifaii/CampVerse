import { useState } from 'react'
import './curriculum.styles.css'
import Overview from '../overview/overview.component'
const Curriculum = () => {
  const [currentPage] = useState("overview")
  return (
    <div className={`overview-schedule ${currentPage == 'overview' ? '' : 'active'}`}>
      <Overview />
    </div>
  )
}
export default Curriculum
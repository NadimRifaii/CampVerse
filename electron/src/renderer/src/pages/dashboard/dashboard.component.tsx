import './dashboard.styles.css'
import { Outlet } from "react-router-dom"
const DashBoard = () => {
  return (
    <div className="dashboard">
      <Outlet />
      <div className="content">
        <h2>This is contentt</h2>
      </div>
    </div>
  )
}
export default DashBoard
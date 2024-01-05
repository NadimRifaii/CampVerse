import { SideBar } from '../../components/sidebar/sidebar.component'
import './dashboard.styles.css'
import { Outlet } from "react-router-dom"
const DashBoard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <Outlet />
    </div>
  )
}
export default DashBoard
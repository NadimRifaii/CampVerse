import Header from '@renderer/components/header/header.component'
import { SideBar } from '@renderer/components/sidebar/sidebar.component'
import './dashboard.styles.css'
import { Outlet } from "react-router-dom"
const DashBoard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
export default DashBoard
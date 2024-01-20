
import Header from '../../components/header/header.component'
import { SideBar } from '../../components/sidebar/sidebar.component'
import './dashboard.styles.css'
import { Outlet } from "react-router-dom"
import { useEffect } from 'react'
import EditProfile from '../../components/editProfile/edit.component'
import useLogic from './logic.hook'
const DashBoard = () => {
  const { refresh, getUserInfo } = useLogic()
  useEffect(() => {
    refresh()
    getUserInfo()
  }, [])
  return (
    <div className="dashboard">
      <SideBar homepage={false} />
      <div className="content">
        <Header />
        <EditProfile />
        <Outlet />
      </div>
    </div>
  )
}
export default DashBoard
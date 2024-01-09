
import './dashboard.styles.css'
import { Outlet } from "react-router-dom"
import {useEffect } from 'react'
import useLogic from './logic.hook'
import EditProfile from '@renderer/components/editProfile/edit.component'
import Header from '@renderer/components/header/header.component'
import { SideBar } from '@renderer/components/sidebar/sidebar.component'
const DashBoard = () => {
  const { refresh, getUserInfo,} = useLogic()
  useEffect(() => {
    refresh()
    getUserInfo()
  }, [])
  return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
        <Header />
        <EditProfile />
        <Outlet />
      </div>
    </div>
  )
}
export default DashBoard
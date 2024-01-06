import Header from '@renderer/components/header/header.component'
import { SideBar } from '@renderer/components/sidebar/sidebar.component'
import './dashboard.styles.css'
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { authDataSource } from '@renderer/core/datasource/remoteDataSource/auth'
import { setUser } from '@renderer/core/datasource/localDataSource/user/userSlice'
import { local } from '@renderer/core/helpers/localStorage'
const DashBoard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    async function refresh() {
      try {
        const data = await authDataSource.refresh({})
        dispatch(setUser(data.user))
        local("token", data.token)
      } catch (error) {
        return navigate('/')
      }
    }
    refresh()
  }, [])
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
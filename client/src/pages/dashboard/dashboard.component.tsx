import { useDispatch } from 'react-redux'
import Header from '../../components/header/header.component'
import { SideBar } from '../../components/sidebar/sidebar.component'
import './dashboard.styles.css'
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { authDataSource } from '../../core/datasource/remoteDataSource/auth'
import { setUser } from '../../core/datasource/localDataSource/user/userSlice'
import { local } from '../../core/helpers/localStorage'
import EditProfile from '../../components/editProfile/edit.component'
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
        <EditProfile />
        <Outlet />

      </div>
    </div>
  )
}
export default DashBoard
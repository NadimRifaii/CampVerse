import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component'
import DashBoard from './pages/dashboard/dashboard.component'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { authDataSource } from './core/datasource/remoteDataSource/auth'
import './styles/colors.css'
import './styles/index.css'
import { local } from './core/helpers/localStorage'
import { useDispatch } from 'react-redux'
import { setUser } from './core/datasource/localDataSource/user/userSlice'
function App(): JSX.Element {
  const dispatch = useDispatch()
  useEffect(() => {
    async function refresh() {
      try {
        const data = await authDataSource.refresh({})
        dispatch(setUser(data.user))
        local("token", data.token)
      } catch (error) {
        console.log(error)
      }
    }
    refresh()
  })
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path='/dashboard' element={<DashBoard />}>
          <Route index element={<h1>Bootcamps</h1>} />
          <Route path="/dashboard/bootcamps" element={<h1>Bootcamps</h1>} />
          <Route path='/dashboard/Create' element={<h1>Create a bootcamp</h1>} />
          <Route path='/dashboard/Users' element={<h1>Users</h1>} />
          <Route path='/dashboard/Add' element={<h1>Add user</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

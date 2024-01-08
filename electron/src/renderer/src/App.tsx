import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component'
import DashBoard from './pages/dashboard/dashboard.component'
import { Toaster } from 'react-hot-toast'
import './styles/colors.css'
import './styles/index.css'
import Bootcamps from './components/bootcamps/bootcamps.component'
import CreateBootcamp from './components/createBootcamp/create-bootcamp.component'
function App(): JSX.Element {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path='/dashboard' element={<DashBoard />}>
          <Route index element={<Bootcamps />} />
          <Route path="/dashboard/bootcamps" element={<Bootcamps />} />
          <Route path='/dashboard/Create' element={<CreateBootcamp />} />
          <Route path='/dashboard/Users' element={<h1>Users</h1>} />
          <Route path='/dashboard/Add' element={<h1>Add user</h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

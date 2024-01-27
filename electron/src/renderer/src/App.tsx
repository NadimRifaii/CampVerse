import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component'
import DashBoard from './pages/dashboard/dashboard.component'
import { Toaster } from 'react-hot-toast'
import './styles/colors.css'
import './styles/index.css'
import Bootcamps from './components/bootcamps/bootcamps.component'
import CreateBootcamp from './components/createBootcamp/create-bootcamp.component'
import Users from './components/users/users.component'
import BootcampDetails from './components/bootcampDetails/bootcamp-details.component'
import Chat from './components/chat/chat.component'
import Schedule from './components/schedule/schedule.component'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <Toaster />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path='/dashboard' element={<DashBoard />}>
            <Route index element={<Bootcamps />} />
            <Route path="/dashboard/bootcamps" element={<Bootcamps />} />
            <Route path='/dashboard/Create' element={<CreateBootcamp />} />
            <Route path='/dashboard/Users' element={<Users showHeader={true} userType='student' showBtn='Add' />} />
            <Route path='/dashboard/details' element={<BootcampDetails />} />
            <Route path="/dashboard/chat" element={<Chat />} />
            <Route path="/dashboard/schedule" element={<Schedule />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </>
  )
}

export default App

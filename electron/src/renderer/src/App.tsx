import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component'
import DashBoard from './pages/dashboard/dashboard.component'
import './styles/colors.css'
import './styles/index.css'
import { SideBar } from './components/sidebar/sidebar.component'
function App(): JSX.Element {
  return (

    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path='/dashboard' element={<DashBoard />}>
        <Route index element={<SideBar />} />
      </Route>
    </Routes>
  )
}

export default App

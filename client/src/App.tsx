import React from 'react';
import './styles/colors.css'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component';
import { Toaster } from 'react-hot-toast'
import { LandingPage } from './pages/LandingPage/landing-page.component';
import { SideBar } from './components/sidebar/sidebar.component';
import DashBoard from './pages/dashboard/dashboard.component';
function App() {
  return (
    <div className="page">
      <Toaster />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<DashBoard />}>
          <Route index element={<h1>Assignments</h1>} />
          <Route path='/dashboard/Assignments' element={<h1>Assignments</h1>} />
          <Route path='/dashboard/Users' element={<h1>Users</h1>} />
          <Route path='/dashboard/Results' element={<h1>Results</h1>} />
          <Route path='/dashboard/Schedule' element={<h1>Schedule</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

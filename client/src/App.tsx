import React from 'react';
import './styles/colors.css'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component';
import { Toaster } from 'react-hot-toast'
import { LandingPage } from './pages/LandingPage/landing-page.component';
import { SideBar } from './components/sidebar/sidebar.component';
import DashBoard from './pages/dashboard/dashboard.component';
import Chat from './components/chat/chat.component';
import Users from './components/users/users.component';
import Bootcamps from './components/bootcamps/bootcamps.component';
import HomePage from './pages/homePage/home-page.component';
import Calendar from './components/calendar/big-calendar.component';
import Assignment from './components/assignments/assignment.component';
import SubmitModal from './components/submitModal/submit-modal.component';
import AssignmentSubmissions from './components/assignmentSubmissions/assignment-submissions.component';
function App() {
  return (
    <div className="page">
      <Toaster />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/' element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/dashboard' element={<DashBoard />}>
          <Route index element={<Assignment />} />
          <Route path='/dashboard/Assignments' element={<Assignment />} />
          <Route path='/dashboard/submit' element={<SubmitModal />} />
          <Route path='/dashboard/Users' element={<Users showHeader={true} showBtn='Chat' />} />
          {/* <Route path='/dashboard/Results' element={<ResultsContainer />} /> */}
          <Route path='/dashboard/Schedule' element={<Calendar />} />
          <Route path={'/dashboard/chat'} element={<Chat />} />
          <Route path='/dashboard/assignment-submissions' element={<AssignmentSubmissions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

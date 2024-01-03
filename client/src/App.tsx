import React from 'react';
import './styles/colors.css'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component';
import { Toaster } from 'react-hot-toast'
import { HomePage } from './pages/homePage/home-page.component';
import { SideBar } from './components/sidebar/sidebar.component';
function App() {
  return (
    <div className="page">
      <Toaster />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/sidebar' element={<SideBar />} />
      </Routes>
    </div>
  );
}

export default App;

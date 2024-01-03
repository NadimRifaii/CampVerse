import React from 'react';
import './styles/colors.css'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component';
import { Toaster } from 'react-hot-toast'
import { HomePage } from './pages/homePage/home-page.component';
function App() {
  return (
    <div className="page">
      <Toaster />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

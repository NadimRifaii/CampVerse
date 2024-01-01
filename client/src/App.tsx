import React from 'react';
import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from './pages/authPage/auth-page.component';
function App() {
  return (
    <div className="page">
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;

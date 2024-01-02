import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ActiveFormContextProvider } from './utils/contexts/active-form.context';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ActiveFormContextProvider>
      <App />
    </ActiveFormContextProvider>
  </BrowserRouter>
);

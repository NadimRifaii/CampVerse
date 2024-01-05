import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ActiveFormContextProvider } from './utils/contexts/active-form.context';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/datasource/localDataSource/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ActiveFormContextProvider>
        <App />
      </ActiveFormContextProvider>
    </Provider>
  </BrowserRouter>
);

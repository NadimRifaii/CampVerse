import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ActiveFormContextProvider } from './utils/contexts/active-form.context';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/datasource/localDataSource/store';
import { ActiveEditContextProvider } from './utils/contexts/active-edit-profile.context';
import { NotificationsContextProvider } from './utils/contexts/notifications.context';
import { CurrentUserContextProvider } from './utils/contexts/current-user.context';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <CurrentUserContextProvider>
        <ActiveFormContextProvider>
          <ActiveEditContextProvider>
            <NotificationsContextProvider>
              <App />
            </NotificationsContextProvider>
          </ActiveEditContextProvider>
        </ActiveFormContextProvider>
      </CurrentUserContextProvider>
    </Provider>
  </BrowserRouter>
);

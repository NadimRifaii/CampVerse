import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/datasource/localDataSource/store';
import { ActiveEditContextProvider } from './utils/contexts/active-edit-profile.context';
import { CurrentUserContextProvider } from './utils/contexts/current-user.context';
import { NotificationsContextProvider } from './utils/contexts/notifications.context';
import 'react-datetime/css/react-datetime.css'
import "react-big-calendar/lib/css/react-big-calendar.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store} >
      <CurrentUserContextProvider>
        <ActiveEditContextProvider>
          <NotificationsContextProvider>
            <App />
          </NotificationsContextProvider>
        </ActiveEditContextProvider>
      </CurrentUserContextProvider>
    </Provider>
  </BrowserRouter>
)

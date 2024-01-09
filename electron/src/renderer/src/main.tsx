import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/datasource/localDataSource/store';
import { ActiveEditContextProvider } from './utils/contexts/active-edit-profile.context';
import { CurrentUserContextProvider } from './utils/contexts/current-user.context';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store} >
      <CurrentUserContextProvider>
        <ActiveEditContextProvider>
          <App />
        </ActiveEditContextProvider>
      </CurrentUserContextProvider>
    </Provider>
  </BrowserRouter>
)

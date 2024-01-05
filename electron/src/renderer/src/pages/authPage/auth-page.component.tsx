import { Login } from "../../components/loginForm/login.component"
import './auth-page.styles.css'
export const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className={`container`}>
        <Login />
      </div>
    </div>
  )
}
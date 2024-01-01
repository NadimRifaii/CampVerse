import { Login } from "../../loginForm/login.component"
import { Signup } from "../../signupForm/signup.component"

export const AuthPage = () => {
  return (
    <div className="auth-page">
      <Login />
      <Signup />
    </div>
  )
}
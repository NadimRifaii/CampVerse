import { ActiveFormContext } from "../../contexts/active-form.context"
import { Login } from "../../components/loginForm/login.component"
import { Overlay } from "../../components/overlay/overlay.component"
import { Signup } from "../../components/signupForm/signup.component"
import './auth-page.styles.css'
import { useContext } from 'react'
export const AuthPage = () => {
  const activeFormContext = useContext(ActiveFormContext)
  if (!activeFormContext) {
    return <h1>activeContext not found</h1>
  }
  const { active } = activeFormContext
  return (
    <div className="auth-page">
      <div className={`container ${active}`}>
        <Login />
        <Signup />
        <Overlay />
      </div>
    </div>
  )
}
import { ActiveContext } from "../../../contexts/active-form.context"
import { Login } from "../../loginForm/login.component"
import { Overlay } from "../../overlay/overlay.component"
import { Signup } from "../../signupForm/signup.component"
import './auth-page.styles.css'
import { useContext } from 'react'
export const AuthPage = () => {
  const activeContext = useContext(ActiveContext)
  if (!activeContext) {
    return <h1>activeContext not found</h1>
  }
  const { active } = activeContext
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
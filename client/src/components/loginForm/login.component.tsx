import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { useContext, useEffect } from 'react'
import { ActiveFormContext } from "../../utils/contexts/active-form.context"
import GoogleButton from "../../assets/continue-with-google"
import { useLogic } from "./logic.hook"
export const Login = () => {
  const { changeHandler, googleSignInComplete, loginClick, signInWithGoogle, credentials } = useLogic()
  useEffect(() => {
    if (googleSignInComplete) {
      loginClick();
    }
  }, [googleSignInComplete]);
  const activeFormContext = useContext(ActiveFormContext)
  if (!activeFormContext) {
    return <h1>activeContext not found</h1>
  }
  const { setActive } = activeFormContext
  return (
    <div className="login">
      <form action="" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginClick()
      }} >
        <h1>login</h1>
        <div className="google-icon" onClick={signInWithGoogle} >
          <GoogleButton />
        </div>
        <p>
          Or continue with your account
        </p>
        <InputLabel label="email" info={{ type: 'email', name: "email", value: credentials.email, onChange: changeHandler }} />
        <InputLabel label="password" info={{ type: "password", name: "password", value: credentials.password, onChange: changeHandler }} />
        <Button className="submit" text="Login" />
      </form>
      <div className="switch-form">
        <span>Don't have an account?</span> <button className="switch" onClick={() => setActive("right-panel-active")} >Signup</button>
      </div>
    </div>
  )
}
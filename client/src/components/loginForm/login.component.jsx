import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../assets/continue-with-google.svg'
import { useContext, useState, useEffect } from 'react'
import { ActiveFormContext } from "../../utils/contexts/active-form.context"
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
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        loginClick()
      }} >
        <h1>login</h1>
        <div className="google-icon" onClick={signInWithGoogle} >
          <MyIcon />
        </div>
        <p>
          Or continue with your account
        </p>
        <InputLabel type="email" label="email" name="email" value={credentials.email} handleChange={changeHandler} />
        <InputLabel type="password" label="password" name="password" value={credentials.password} handleChange={changeHandler} />
        <Button className="submit" text="Login" />
      </form>
      <div className="switch-form">
        <span>Don't have an account?</span> <button className="switch" onClick={() => setActive("right-panel-active")} >Signup</button>
      </div>
    </div>
  )
}
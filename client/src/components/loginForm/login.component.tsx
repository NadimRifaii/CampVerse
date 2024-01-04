import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { useContext, useEffect } from 'react'
import { ActiveFormContext } from "../../utils/contexts/active-form.context"
import GoogleButton from "../../assets/GoogleButton"
import { useLogic } from "./logic.hook"
export const Login = () => {
  const { inputLabels, googleSignInComplete, loginClick, signInWithGoogle } = useLogic()
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
        <h1>log In</h1>

        {
          inputLabels.map(inputLabel => <InputLabel key={inputLabel.id} info={inputLabel} />)
        }
        <Button className="submit" text="Log In" />
        <p>
          Or
        </p>
        <div className="google-icon" onClick={signInWithGoogle} >
          <GoogleButton />
        </div>
      </form>
      <div className="switch-form">
        <span>Don't have an account?</span> <button className="switch" onClick={() => setActive("right-panel-active")} >Sign Up</button>
      </div>
    </div>
  )
}
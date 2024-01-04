import { Button } from "../common/button/button.component";
import { InputLabel } from "../common/inputLabel/input-label.component";
import { useContext, useEffect } from 'react';
import GoogleButton from "../../assets/continue-with-google";
import './signup.styles.css';
import { ActiveFormContext } from "../../utils/contexts/active-form.context";
import { useLogic } from "./logic.hook";
export const Signup = () => {
  const { googleSignUpComplete, signupClick, signUpWithGoogle, inputLabels } = useLogic()
  useEffect(() => {
    if (googleSignUpComplete) {
      signupClick();
    }
  }, [googleSignUpComplete]);
  const activeFormContext = useContext(ActiveFormContext)
  if (!activeFormContext) {
    return <h1>activeContext not found</h1>
  }
  const { setActive } = activeFormContext
  return (
    <div className="signup">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          signupClick()
        }}
      >
        <h1>Create account</h1>
        <div className="google-icon" onClick={signUpWithGoogle}>
          <GoogleButton />
        </div>
        <p>
          Or register with your email
        </p>
        {
          inputLabels.map((inputLabel) => {
            return <InputLabel key={inputLabel.id} info={inputLabel} />
          })
        }
        <Button className="submit" text="Signup" />
      </form>
      <div className="switch-form">
        <span>Already have an account?</span> <button className="switch" onClick={() => setActive("")} >Login</button>
      </div>
    </div>
  );
};

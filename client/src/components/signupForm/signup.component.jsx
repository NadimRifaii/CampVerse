import { Button } from "../common/button/button.component";
import { InputLabel } from "../common/inputLabel/input-label.component";
import { ReactComponent as MyIcon } from '../../assets/continue-with-google.svg';
import { useContext, useEffect } from 'react';
import './signup.styles.css';
import { ActiveFormContext } from "../../utils/contexts/active-form.context";
import { useLogic } from "./logic.hook";
export const Signup = () => {
  const { changeHandler, googleSignUpComplete, signupClick, signUpWithGoogle, credentials } = useLogic()
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
          <MyIcon />
        </div>
        <p>
          Or register with your email
        </p>
        <InputLabel type="text" label="First name" value={credentials.firstname} name='firstname' handleChange={changeHandler} />
        <InputLabel type="text" label="Last name" value={credentials.lastname} name='lastname' handleChange={changeHandler} />
        <InputLabel type="email" label="Email" value={credentials.email} name='email' handleChange={changeHandler} />
        <InputLabel type="password" className="last" label="Password" value={credentials.password} name='password' handleChange={changeHandler} />
        {/* <div className="radio-holder">
          <div className="holder">
            <input type="radio" id="student" name='role' value='student' onChange={changeHandler} />
            <label htmlFor="student">Student</label>
          </div>
          <div className="holder">
            <input type="radio" id="mentor" name='role' value='mentor' onChange={changeHandler} checked={role === 'mentor'} />
            <label htmlFor="mentor">Mentor</label>
          </div>
        </div> */}
        <Button className="submit" text="Signup" />
      </form>
      <div className="switch-form">
        <span>Already have an account?</span> <button className="switch" onClick={() => setActive("")} >Login</button>
      </div>
    </div>
  );
};

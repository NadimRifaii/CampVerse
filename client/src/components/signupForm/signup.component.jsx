import { Button } from "../common/button/button.component";
import { InputLabel } from "../common/inputLabel/input-label.component";
import { ReactComponent as MyIcon } from '../../continue-with-google.svg';
import { useState, useContext } from 'react';
import './signup.styles.css';
import { ActiveFormContext } from '../../contexts/active-form.context'
const defaultFormFields = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "mentor",
};

export const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstname, lastname, email, password, role } = formFields;
  const changeHandler = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };
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
        }}
      >
        <h1>Create account</h1>
        <div className="google-icon">
          <MyIcon />
        </div>
        <p>
          Or continue with your personal info
        </p>
        <InputLabel type="text" label="First name" value={firstname} name='firstname' handleChange={changeHandler} />
        <InputLabel type="text" label="Last name" value={lastname} name='lastname' handleChange={changeHandler} />
        <InputLabel type="email" label="Email" value={email} name='email' handleChange={changeHandler} />
        <InputLabel type="password" className="last" label="Password" value={password} name='password' handleChange={changeHandler} />
        <div className="radio-holder">
          <div className="holder">
            <input type="radio" id="student" name='role' value='student' onChange={changeHandler} />
            <label htmlFor="student">Student</label>
          </div>
          <div className="holder">
            <input type="radio" id="mentor" name='role' value='mentor' onChange={changeHandler} checked={role === 'mentor'} />
            <label htmlFor="mentor">Mentor</label>
          </div>
        </div>
        <Button className="submit" text="Signup" />
      </form>
      <div className="switch-form">
        <span>Already have an account?</span> <button className="switch" onClick={() => setActive("")} >Login</button>
      </div>
    </div>
  );
};

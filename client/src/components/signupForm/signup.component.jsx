import { Button } from "../common/button/button.component";
import { InputLabel } from "../common/inputLabel/input-label.component";
import { ReactComponent as MyIcon } from '../../Google.svg';
import { useState } from 'react';
import './signup.styles.css';

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
  console.log(formFields)
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
        <InputLabel type="text" label="First name" value={firstname} name='firstname' handleChange={changeHandler} />
        <InputLabel type="text" label="Last name" value={lastname} name='lastname' handleChange={changeHandler} />
        <InputLabel type="email" label="Email" value={email} name='email' handleChange={changeHandler} />
        <InputLabel type="password" label="Password" value={password} name='password' handleChange={changeHandler} />
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
        <Button text="Signup" />
      </form>
    </div>
  );
};

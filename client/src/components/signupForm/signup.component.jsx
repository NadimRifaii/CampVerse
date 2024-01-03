import { Button } from "../common/button/button.component";
import { InputLabel } from "../common/inputLabel/input-label.component";
import { ReactComponent as MyIcon } from '../../continue-with-google.svg';
import { useState, useContext, useEffect } from 'react';
import './signup.styles.css';
import { ActiveFormContext } from "../../utils/contexts/active-form.context";
import { signInWithGooglePopup } from "../../utils/firebase/firebase"
import { request } from "../../utils/axios/axios";
import { toast } from 'react-hot-toast';
const defaultFormFields = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "student",
};

export const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [googleSignUpComplete, setGoogleSignUpComplete] = useState(false);
  const { firstname, lastname, email, password, role } = formFields;
  const changeHandler = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };
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
  const signupClick = async () => {
    const loadingToastId = toast.loading('Logging in...');
    try {
      const data = await request(`auth/signup`, 'POST', formFields)
      const token = data.token
      localStorage.setItem("token", `Bearer ${token}`)
      console.log(data)
      setFormFields({ ...defaultFormFields })
      toast.success('Signup successful!', { id: loadingToastId });
      setGoogleSignUpComplete(false);
    } catch (error) {
      toast.error(`${error}`, { id: loadingToastId });
    }
  }
  const signUpWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup()
      const userAuth = response.user
      const firstname = userAuth.displayName.split(" ")[0]
      const lastname = userAuth.displayName.split(" ")[1]
      setFormFields({ ...formFields, firstname, lastname, ['email']: userAuth.email, ['password']: userAuth.uid })
      setGoogleSignUpComplete(true);
    } catch (error) {
      console.log(error)
    }
  }


  // ... your existing code ...
  return (
    <div className="signup">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          signupClick()
          setFormFields({ ...defaultFormFields })
        }}
      >
        <h1>Create account</h1>
        <div className="google-icon" onClick={signUpWithGoogle}>
          <MyIcon />
        </div>
        <p>
          Or register with your email
        </p>
        <InputLabel type="text" label="First name" value={firstname} name='firstname' handleChange={changeHandler} />
        <InputLabel type="text" label="Last name" value={lastname} name='lastname' handleChange={changeHandler} />
        <InputLabel type="email" label="Email" value={email} name='email' handleChange={changeHandler} />
        <InputLabel type="password" className="last" label="Password" value={password} name='password' handleChange={changeHandler} />
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

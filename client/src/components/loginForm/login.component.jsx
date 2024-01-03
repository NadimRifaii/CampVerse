import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../continue-with-google.svg'
import { useContext, useState } from 'react'
import { ActiveFormContext } from "../../utils/contexts/active-form.context"
import { signInWithGooglePopup } from "../../utils/firebase/firebase"
import { request } from "../../utils/axios/axios"
const defaultFormFields = {
  email: "",
  password: "",
};
export const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const changeHandler = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };
  const activeFormContext = useContext(ActiveFormContext)
  if (!activeFormContext) {
    return <h1>activeContext not found</h1>
  }
  const { setActive } = activeFormContext
  const loginClick = async () => {
    try {
      const data = await request(`auth/login`, 'POST', formFields)
      const token = data.token
      localStorage.setItem("token", `Bearer ${token}`)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const signInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup()
      const userAuth = response.user
      setFormFields({ ['email']: userAuth.email, ['password']: userAuth.uid })
      loginClick()
    } catch (error) {
      console.log(error)
    }
  }
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
        <InputLabel type="email" label="email" name="email" value={email} handleChange={changeHandler} />
        <InputLabel type="password" label="password" name="password" value={password} handleChange={changeHandler} />
        <Button className="submit" text="Login" />
      </form>
      <div className="switch-form">
        <span>Don't have an account?</span> <button className="switch" onClick={() => setActive("right-panel-active")} >Signup</button>
      </div>
    </div>
  )
}
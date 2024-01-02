import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../Google.svg'
import { useState } from 'react'
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
  return (
    <div className="login">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
      }} >
        <h1>login</h1>
        <div className="google-icon" >
          <MyIcon />
        </div>
        <InputLabel type="email" label="email" name="email" value={email} handleChange={changeHandler} />
        <InputLabel type="password" label="password" name="password" value={password} handleChange={changeHandler} />
        <Button text="Login" />
      </form>
    </div>
  )
}
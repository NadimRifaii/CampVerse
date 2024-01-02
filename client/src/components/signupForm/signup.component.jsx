import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../Google.svg'
import { useState } from 'react'
import './signup.styles.css'
const defaultFormFields = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: ""
}

export const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { firstname, lastname, email, password, role } = formFields
  return (
    <div className="signup">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
      }} >
        <h1>Create account</h1>
        <div className="google-icon" >
          <MyIcon />
        </div>
        <InputLabel type="text" label="First name" name='firstname' />
        <InputLabel type="text" label="Last name" name='lastname' />
        <InputLabel type="email" label="Email" name='email' />
        <InputLabel type="password" label="Password" name='password' />
        <Button text="Signup" />
      </form>
    </div>
  )
}
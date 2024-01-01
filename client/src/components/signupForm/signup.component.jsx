import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../Google.svg'

export const Signup = () => {
  return (
    <div className="signup">
      <form action="">
        <h1>Create account</h1>
        <div className="google-icon" >
          <MyIcon />
        </div>
        <InputLabel type="text" label="First name" />
        <InputLabel type="text" label="Last name" />
        <InputLabel type="email" label="Email" />
        <InputLabel type="password" label="Password" />
        <Button text="Signup" />
      </form>
    </div>
  )
}
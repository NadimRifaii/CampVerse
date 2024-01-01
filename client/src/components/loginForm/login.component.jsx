import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../Google.svg'
import './login.styles.css'
export const Login = () => {
  return (
    <div className="login">
      <form action="">
        <h1>login</h1>
        <div className="google-icon" >
          <MyIcon />
        </div>
        <InputLabel type="text" label="email" />
        <InputLabel type="password" label="password" />
        <Button text="Login" />
      </form>
    </div>
  )
}
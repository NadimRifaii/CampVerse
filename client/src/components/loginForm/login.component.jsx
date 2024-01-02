import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../Google.svg'
export const Login = () => {
  return (
    <div className="login">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
      }} >
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
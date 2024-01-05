import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { useLogic } from "./logic.hook"
export const Login = () => {
  const { inputLabels, loginClick } = useLogic()
  return (
    <div className="login">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        loginClick()
      }} >
        <h1>log In</h1>

        {
          inputLabels.map(inputLabel => <InputLabel key={inputLabel.id} info={inputLabel} />)
        }
        <Button className="submit" text="Log In" />
      </form>
    </div>
  )
}
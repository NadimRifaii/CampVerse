import { Button } from "../common/button/button.component"
import { InputLabel } from "../common/inputLabel/input-label.component"
import { ReactComponent as MyIcon } from '../../assets/continue-with-google.svg'
import { useContext, useState, useEffect } from 'react'
import { ActiveFormContext } from "../../utils/contexts/active-form.context"
import { signInWithGooglePopup } from "../../utils/firebase/firebase"
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setUser } from "../../core/datasource/localDataSource/user/userSlice"
import { sendRequest } from "../../core/helpers/request"
import { local } from "../../core/helpers/localStorage"
import { authDataSource } from "../../core/datasource/remoteDataSource/auth"
const defaultFormFields = {
  email: "",
  password: "",
};
export const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [googleSignInComplete, setGoogleSignInComplete] = useState(false);
  const dispatch = useDispatch()
  const { email, password } = formFields;

  useEffect(() => {
    if (googleSignInComplete) {
      loginClick();
    }
  }, [googleSignInComplete]);
  const changeHandler = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };
  const activeFormContext = useContext(ActiveFormContext)
  if (!activeFormContext) {
    return <h1>activeContext not found</h1>
  }
  const { setActive } = activeFormContext
  function handleLogin(data) {
    dispatch(setUser(data.user))
    setGoogleSignInComplete(false);
    setFormFields({ ...defaultFormFields })
  }
  const loginClick = async () => {
    const loadingToastId = toast.loading('Logging in...');
    try {
      const data = await authDataSource.login(formFields)
      local("token", data.token)
      handleLogin(data)
      toast.success('Login successful!', { id: loadingToastId });
    } catch (error) {
      setFormFields({ ...defaultFormFields })
      toast.error(`${error}`, { id: loadingToastId });
    }
  }
  const signInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup()
      const userAuth = response.user
      setFormFields({ ['email']: userAuth.email, ['password']: userAuth.uid })
      setGoogleSignInComplete(true);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="login">
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        loginClick()
        setFormFields({ ...defaultFormFields })
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
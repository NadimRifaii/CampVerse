import { local } from "../../core/helpers/localStorage";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { LoginCredentials } from "../../core/types/loginCredentials";
import { setUser } from "../../core/datasource/localDataSource/user/userSlice";
import toast from "react-hot-toast";
import { authDataSource } from "../../core/datasource/remoteDataSource/auth";
import { signInWithGooglePopup } from "../../utils/firebase/firebase";
const defaultCredentials: LoginCredentials = {
  email: "",
  password: "",
};
export const useLogic = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>(defaultCredentials)
  const [googleSignInComplete, setGoogleSignInComplete] = useState<boolean>(false);
  const dispatch = useDispatch()
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  function handleLogin(data: any) {
    dispatch(setUser(data.user))
    setGoogleSignInComplete(false);
    setCredentials({ ...defaultCredentials })
  }
  const loginClick = async () => {
    const loadingToastId = toast.loading('Logging in...');
    try {
      const data = await authDataSource.login(credentials)
      local("token", data.token)
      handleLogin(data)
      toast.success('Login successful!', { id: loadingToastId });
    } catch (error) {
      setCredentials({ ...defaultCredentials })
      toast.error(`${error}`, { id: loadingToastId });
    }

  }
  const signInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup()
      const userAuth = response.user
      if (userAuth.email !== null && userAuth.uid !== null)
        setCredentials({ ['email']: userAuth.email, ['password']: userAuth.uid })
      setGoogleSignInComplete(true);
    } catch (error) {
      console.log(error)
    }
  }
  return { changeHandler, signInWithGoogle, loginClick, googleSignInComplete, credentials }
}
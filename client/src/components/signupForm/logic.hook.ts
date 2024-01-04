import { local } from "../../core/helpers/localStorage";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { setUser } from "../../core/datasource/localDataSource/user/userSlice";
import { SignupCredentials } from "../../core/types/signupCredentials";
import toast from "react-hot-toast";
import { authDataSource } from "../../core/datasource/remoteDataSource/auth";
import { signInWithGooglePopup } from "../../utils/firebase/firebase";
const defaultCredentials: SignupCredentials = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "student"
};
export const useLogic = () => {
  const [credentials, setCredentials] = useState<SignupCredentials>(defaultCredentials)
  const [googleSignUpComplete, setGoogleSignUpComplete] = useState(false);
  const dispatch = useDispatch()
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const inputs = [
    {
      label: "First name",
      type: "text",
      value: credentials.firstname,
      name: "firstname",
      id: "firstname",
      onChange: changeHandler
    },
    {
      label: "Last name",
      type: "text",
      value: credentials.lastname,
      name: "lastname",
      id: "lastname",
      onChange: changeHandler
    },
    {
      label: "Email",
      type: "email",
      value: credentials.email,
      name: "email",
      id: 'signup-email',
      onChange: changeHandler
    },
    {
      label: "Password",
      type: "password",
      value: credentials.password,
      name: "password",
      id: "signup-password",
      onChange: changeHandler
    }
  ]
  function handleSignup(data: any) {
    dispatch(setUser(data.user))
    setGoogleSignUpComplete(false);
    setCredentials({ ...defaultCredentials })
  }
  const signupClick = async () => {
    const loadingToastId = toast.loading('Logging in...');
    try {
      const data = await authDataSource.register(credentials)
      local("token", data.token)
      handleSignup(data)
      toast.success('Signup successful!', { id: loadingToastId });
    } catch (error) {
      setCredentials({ ...defaultCredentials })
      toast.error(`${error}`, { id: loadingToastId });
    }

  }
  const signUpWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup()
      const userAuth = response.user
      if (userAuth.displayName && userAuth.email !== null && userAuth.uid !== null) {
        const firstname = userAuth.displayName.split(" ")[0]
        const lastname = userAuth.displayName.split(" ")[1]
        setCredentials({ ...credentials, firstname, lastname, ['email']: userAuth.email, ['password']: userAuth.uid })
        setGoogleSignUpComplete(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { signUpWithGoogle, signupClick, googleSignUpComplete, inputs }
}
import { local } from "../../core/helpers/localStorage";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { LoginCredentials } from "../../core/types/loginCredentials";
import { setUser } from "../../core/datasource/localDataSource/user/userSlice";
import toast from "react-hot-toast";
import { authDataSource } from "../../core/datasource/remoteDataSource/auth";
import { useNavigate } from "react-router-dom";
const defaultCredentials: LoginCredentials = {
  email: "",
  password: "",
};
export const useLogic = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>(defaultCredentials)
  const dispatch = useDispatch()
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate()
  const inputLabels = [
    {
      label: "Email",
      type: "email",
      value: credentials.email,
      name: "email",
      id: 'login-email',
      onChange: changeHandler
    },
    {
      label: "Password",
      type: "password",
      value: credentials.password,
      name: "password",
      id: "login-password",
      onChange: changeHandler
    }
  ]
  function handleLogin(data: any) {
    dispatch(setUser(data.user))
    setCredentials({ ...defaultCredentials })
  }
  const loginClick = async () => {
    const loadingToastId = toast.loading('Logging in...');
    try {
      const data = await authDataSource.login(credentials)
      local("token", data.token)
      handleLogin(data)
      toast.success('Login successful!', { id: loadingToastId });
      navigate("/dashboard")
    } catch (error) {
      setCredentials({ ...defaultCredentials })
      toast.error(`${error}`, { id: loadingToastId });
    }

  }

  return { inputLabels, loginClick }
}
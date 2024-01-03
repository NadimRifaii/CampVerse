import { local } from "../../core/helpers/localStorage";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { LoginCredentials } from "../../core/types/loginCredentials";
export const useLogic = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: ''
  })
  const dispatch = useDispatch()
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return { changeHandler }
}
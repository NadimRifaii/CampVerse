import { useState } from "react"

const defaultCredentials = {
  name: "",
  outcomes: "",
  audience: ""
}
const useLogic = () => {
  const [credentials, setCredentials] = useState(defaultCredentials)
  const changeHandler = (event) => {
    setCredentials({ ...credentials, [event?.target.name]: event?.target.value })
  }
  const resetFields=()=>{
    setCredentials({...defaultCredentials})
  }
  return { changeHandler, credentials ,resetFields}
}
export default useLogic
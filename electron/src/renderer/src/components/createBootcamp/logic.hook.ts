import { bootcampsDataSource } from "@renderer/core/datasource/remoteDataSource/bootcamps"
import { useState } from "react"
import toast from "react-hot-toast";
const defaultCredentials = {
  name: "",
  outcomes: "",
  audience: "",
  numberOfWeeks: ""
}
const useLogic = () => {
  const [credentials, setCredentials] = useState(defaultCredentials)
  const changeHandler = (event) => {
    if (event.target.name == "numberOfWeeks") {
      const value = +event.target.value
      setCredentials({ ...credentials, [event?.target.name]: value })
    } else {
      setCredentials({ ...credentials, [event?.target.name]: event?.target.value })
    }
  }
  const resetFields = () => {
    setCredentials({ ...defaultCredentials })
  }
  const createBootcamp = async () => {
    const loadingToastId = toast.loading('Loading...');
    try {
      const response = await bootcampsDataSource.createBootcamp(credentials)
      toast.success(response.message, { id: loadingToastId });
      resetFields()
    } catch (error) {
      resetFields()
      toast.error(`This bootcamp already exists`, { id: loadingToastId })
    }
  }
  return { changeHandler, credentials, resetFields, createBootcamp }
}
export default useLogic
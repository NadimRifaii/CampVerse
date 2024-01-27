import { bootcampsDataSource } from "@renderer/core/datasource/remoteDataSource/bootcamps"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
const defaultCredentials = {
  name: "",
  outcomes: "",
  audience: "",
  numberOfWeeks: "",
  startDate: "",
  endDate: ""
}
const useLogic = () => {
  const [credentials, setCredentials] = useState(defaultCredentials)
  useEffect(() => {
    console.log(credentials)
  }, [credentials])
  const changeHandler = (event) => {
    if (event.target.name == "numberOfWeeks") {
      if (credentials.startDate != '') {
        const value = +event.target.value
        const endDate = new Date(credentials.startDate);
        endDate.setDate(endDate.getDate() + 7 * value);
        setCredentials({ ...credentials, [event?.target.name]: value, ['endDate']: endDate.toISOString().split('T')[0] })
      }
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
      console.log(credentials)
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
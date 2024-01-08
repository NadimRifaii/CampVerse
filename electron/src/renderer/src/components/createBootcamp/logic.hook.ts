import { bootcampsDataSource } from "@renderer/core/datasource/remoteDataSource/bootcamps"
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
  const resetFields = () => {
    setCredentials({ ...defaultCredentials })
  }
  const createBootcamp = async () => {
    try {
      const response = await bootcampsDataSource.createBootcamp(credentials)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return { changeHandler, credentials, resetFields, createBootcamp }
}
export default useLogic
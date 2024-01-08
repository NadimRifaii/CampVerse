import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user"

const useLogic = () => {
  const fetchUsers = async (userType: "user" | "student" | "mentor") => {
    try {
      const response = await userDataSource.getAllUsers({}, userType)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return { fetchUsers }
}
export default useLogic
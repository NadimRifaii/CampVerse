import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user"

const useLogic = () => {
  const getUsers = async () => {
    try {
      const response = await userDataSource.getAllUsers({})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchUsers = async (userType: "" | "student" | "mentor") => {
    switch (userType) {
      case "":
        await getUsers()
        break;
    }
  }
  return { fetchUsers }
}
export default useLogic
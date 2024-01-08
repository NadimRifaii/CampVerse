import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user"
import { useDispatch, useSelector } from "react-redux"
import { extractUsersSlice, setUsers } from "@renderer/core/datasource/localDataSource/users/usersSlice"
const useLogic = () => {
  const { users } = useSelector(extractUsersSlice)
  const dispatch = useDispatch()
  const fetchUsers = async (userType: "user" | "student" | "mentor") => {
    try {
      const response = await userDataSource.getAllUsers({}, userType)
      dispatch(setUsers(response))
    } catch (error) {
      console.log(error)
    }
  }
  return { fetchUsers, users }
}
export default useLogic
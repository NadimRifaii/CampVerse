import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user"
import { useDispatch, useSelector } from "react-redux"
import { extractUsersSlice, setUsers } from "@renderer/core/datasource/localDataSource/users/usersSlice"
import { useEffect, useState } from "react"
const useLogic = () => {
  const { users } = useSelector(extractUsersSlice)
  let [filteredArray, setFilteredArray] = useState(users)
  const dispatch = useDispatch()
  useEffect(() => {
    setFilteredArray(users)
  }, [users])
  const fetchUsers = async (userType: "user" | "student" | "mentor") => {
    try {
      const response = await userDataSource.getAllUsers({}, userType)
      dispatch(setUsers(response.users))
    } catch (error) {
      console.log(error)
    }
  }
  const searchUsers = (query: string) => {
    const filteredUsers = users.filter(user => {
      const fullName = user.firstname + ' ' + user.lastname;
      const regex = new RegExp(query, 'i');
      return regex.test(fullName);
    });
    setFilteredArray(filteredUsers)
  };
  return { fetchUsers, filteredArray, searchUsers }
}
export default useLogic
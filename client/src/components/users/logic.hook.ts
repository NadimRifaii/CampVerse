import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { UsersSliceType, extractUsersSlice, setUsers } from "../../core/datasource/localDataSource/users/usersSlice"
import { userDataSource } from "../../core/datasource/remoteDataSource/user"
import { bootcampsDataSource } from "../../core/datasource/remoteDataSource/bootcamps"
import { setBootcamps } from "../../core/datasource/localDataSource/bootcamps/bootcampsSlice"
const useLogic = () => {
  const dispatch = useDispatch()
  const { users }: UsersSliceType = useSelector(extractUsersSlice)
  let [filteredArray, setFilteredArray] = useState(users)
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
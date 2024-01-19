import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { UsersSliceType, extractUsersSlice, setUsers } from "../../core/datasource/localDataSource/users/usersSlice"
import { userDataSource } from "../../core/datasource/remoteDataSource/user"
import { CurrentBootcampType, extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { User } from "../../core/types/user"
const useLogic = () => {
  const dispatch = useDispatch()
  const { users }: UsersSliceType = useSelector(extractUsersSlice)
  const user = useSelector(extractUserSlice)
  const { currentBootcamp }: CurrentBootcampType = useSelector(extractcurrentBootcampSlice)

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
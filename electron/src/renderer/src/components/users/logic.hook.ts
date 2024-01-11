import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user"
import { useDispatch, useSelector } from "react-redux"
import { UsersSliceType, extractUsersSlice, setUsers } from "@renderer/core/datasource/localDataSource/users/usersSlice"
import { useEffect, useState } from "react"
import { extractBootcampsSlice, setBootcamps } from "@renderer/core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { bootcampsDataSource } from "@renderer/core/datasource/remoteDataSource/bootcamps"
import toast from "react-hot-toast"
const useLogic = () => {
  const { users }: UsersSliceType = useSelector(extractUsersSlice)
  const { bootcamps } = useSelector(extractBootcampsSlice)
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
  const getBootcamps = async () => {
    try {
      const response = await bootcampsDataSource.getBootcamps({})
      dispatch(setBootcamps(response))
    } catch (error) {
      console.log(error)
    }

  }
  const addUserToBootcamp = async (data: any) => {
    const loadingToastId = toast.loading('Adding the user...');
    try {
      const response = await bootcampsDataSource.addUserToBootcamp(data)
      toast.success(response.message, { id: loadingToastId });
      console.log(response.message)
    } catch (error) {
      toast.error(`User already exist in this bootcamp`, { id: loadingToastId });
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
  return { fetchUsers, filteredArray, searchUsers, bootcamps, getBootcamps, addUserToBootcamp }
}
export default useLogic
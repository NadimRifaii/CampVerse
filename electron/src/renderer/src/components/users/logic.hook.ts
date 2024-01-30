import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user"
import { useDispatch, useSelector } from "react-redux"
import { UsersSliceType, extractUsersSlice, setUsers } from "@renderer/core/datasource/localDataSource/users/usersSlice"
import { useEffect, useState } from "react"
import { BootcampsSliceType, extractBootcampsSlice, setBootcamps } from "@renderer/core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { bootcampsDataSource } from "@renderer/core/datasource/remoteDataSource/bootcamps"
import toast from "react-hot-toast"
const useLogic = () => {
  const dispatch = useDispatch()
  const { users }: UsersSliceType = useSelector(extractUsersSlice)
  const { bootcamps }: BootcampsSliceType = useSelector(extractBootcampsSlice)
  useEffect(() => {
  }, [])
  let [filteredArray, setFilteredArray] = useState(users)
  const [currentActiveComponent, setCurrentActiveComponent] = useState<"student" | "mentor">('student')
  useEffect(() => {
    setFilteredArray(users)
  }, [users])
  const fetchUsers = async (userType: "student" | "mentor") => {
    try {
      const response = await userDataSource.getAllUsers({}, userType)
      dispatch(setUsers(response.users))
    } catch (error) {
    }
  }
  const setBootcampUsers = (bootcampUsers: []) => {
    dispatch(setUsers(bootcampUsers))
  }
  const getBootcamps = async () => {
    try {
      const response = await bootcampsDataSource.getBootcamps({})
      dispatch(setBootcamps(response))
    } catch (error) {
    }

  }
  const addUserToBootcamp = async (data: any) => {
    const loadingToastId = toast.loading('Adding the user...');
    try {
      const response = await bootcampsDataSource.addUserToBootcamp(data)
      toast.success(response.message, { id: loadingToastId });
    } catch (error) {
      toast.error(`User already exist in this bootcamp`, { id: loadingToastId });
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
  return { fetchUsers, filteredArray, currentActiveComponent, setCurrentActiveComponent, searchUsers, bootcamps, getBootcamps, addUserToBootcamp, setBootcampUsers }
}
export default useLogic
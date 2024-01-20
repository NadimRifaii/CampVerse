import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { UsersSliceType, extractUsersSlice, setUsers } from "../../core/datasource/localDataSource/users/usersSlice"
import { userDataSource } from "../../core/datasource/remoteDataSource/user"
import { BootcampsSliceType, extractBootcampsSlice, setBootcamps } from "../../core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { bootcampsDataSource } from "../../core/datasource/remoteDataSource/bootcamps"
const useLogic = () => {
  const dispatch = useDispatch()
  const { users }: UsersSliceType = useSelector(extractUsersSlice)
  const { bootcamps }: BootcampsSliceType = useSelector(extractBootcampsSlice)
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
      console.log(error)
    }
  }
  const setBootcampUsers = (bootcampUsers: []) => {
    dispatch(setUsers(bootcampUsers))
  }
  const getBootcamps = async () => {
    try {
      const response = await bootcampsDataSource.getUserBootcamps({})
      dispatch(setBootcamps(response))
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
  return { fetchUsers, filteredArray, currentActiveComponent, setCurrentActiveComponent, searchUsers, bootcamps, getBootcamps, setBootcampUsers }
}
export default useLogic
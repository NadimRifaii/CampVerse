import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { UsersSliceType, extractUsersSlice, setUsers } from "../../core/datasource/localDataSource/users/usersSlice"
import { userDataSource } from "../../core/datasource/remoteDataSource/user"
import { BootcampsSliceType, extractBootcampsSlice, setBootcamps } from "../../core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { User } from "../../core/types/user"
const useLogic = () => {
  const dispatch = useDispatch()
  const { students, mentors }: UsersSliceType = useSelector(extractUsersSlice)
  const { bootcamps }: BootcampsSliceType = useSelector(extractBootcampsSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  let [filteredArray, setFilteredArray] = useState<User[]>(students)
  const [currentActiveComponent, setCurrentActiveComponent] = useState<"student" | "mentor">('student')
  useEffect(() => {
    if (currentActiveComponent == "student")
      setFilteredArray(students)
    else
      setFilteredArray(mentors)
  }, [currentActiveComponent, students, mentors])
  // const fetchUsers = async (userType: "student" | "mentor") => {
  //   try {
  //     const response = await userDataSource.getAllBootcampUsers({ bootcampId: currentBootcamp.id })
  //     dispatch(setUsers(response))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const searchUsers = (query: string) => {
    const filteredUsers = filteredArray.filter(user => {
      const fullName = user.firstname + ' ' + user.lastname;
      const regex = new RegExp(query, 'i');
      return regex.test(fullName);
    });
    setFilteredArray(filteredUsers)
  };
  return { filteredArray, currentActiveComponent, setCurrentActiveComponent, searchUsers }
}
export default useLogic
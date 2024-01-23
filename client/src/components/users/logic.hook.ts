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
  let [filteredArray, setFilteredArray] = useState<User[]>(students)
  const [users, setUsers] = useState<User[]>([])
  const [currentActiveComponent, setCurrentActiveComponent] = useState<"student" | "mentor">('student')
  useEffect(() => {
    if (currentActiveComponent == "student") {
      setFilteredArray(students)
      setUsers(students)
    }
    else {
      setFilteredArray(mentors)
      setUsers(mentors)
    }
  }, [currentActiveComponent, students, mentors])
  useEffect(() => {

  }, [users, students])
  const searchUsers = (query: string) => {
    const filteredUsers = users.filter(user => {
      const fullName = user.firstname + ' ' + user.lastname;
      const regex = new RegExp(query, 'i');
      return regex.test(fullName);
    });
    setFilteredArray(filteredUsers)
  };
  return { filteredArray, currentActiveComponent, setCurrentActiveComponent, searchUsers }
}
export default useLogic
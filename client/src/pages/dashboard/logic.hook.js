import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { userDataSource } from "../../core/datasource/remoteDataSource/user"
import { authDataSource } from '../../core/datasource/remoteDataSource/auth'
import { setUser, updateUser } from '../../core/datasource/localDataSource/user/userSlice'
import { local } from '../../core/helpers/localStorage'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { removeChat } from "../../core/datasource/localDataSource/chat/chatSlice"
import { extractChatSlice } from "../../core/datasource/localDataSource/chat/chatSlice"
import { setUsers } from "../../core/datasource/localDataSource/users/usersSlice"
import { setBootcamps } from "../../core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { extractBootcampsSlice } from "../../core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { bootcampsDataSource } from "../../core/datasource/remoteDataSource/bootcamps"
import { extractcurrentBootcampSlice, setcurrentBootcamp } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
const useLogic = () => {
  const dispatch = useDispatch()
  const { bootcamps } = useSelector(extractBootcampsSlice)
  const { chat } = useSelector(extractChatSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const navigate = useNavigate()
  const user = useSelector(extractUserSlice)
  useEffect(() => {
    dispatch(removeChat({}))
  }, [])
  async function refresh() {
    try {
      const data = await authDataSource.refresh({})
      dispatch(setUser(data.user))
      dispatch(setcurrentBootcamp(JSON.parse(local("currentBootcamp"))))
      console.log(currentBootcamp)
      local("token", data.token)
    } catch (error) {
      console.log(error)
      return navigate('/home')
    }
  }
  async function getUserInfo() {
    try {
      const data = await userDataSource.getUser({})
      dispatch(updateUser(data.info))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getBootcamps() {
      try {
        const response = await bootcampsDataSource.getUserBootcamps({})
        for (let i = 0; i < response.bootcamps.length; i++) {
          if (response.bootcamps[i].students == null)
            response.bootcamps[i].students = []
          if (response.bootcamps[i].mentors == null)
            response.bootcamps[i].mentors = []
        }
        dispatch(setBootcamps(response))
      } catch (error) {
        console.log(error)
      }
    }
    getBootcamps()
  }, [])
  useEffect(() => {
    const allUsers = [...currentBootcamp.students, ...currentBootcamp.mentors]
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email == user.email) {
        allUsers.splice(i, 1)
        break;
      }
    }
    dispatch(setUsers(allUsers))
  }, [currentBootcamp])
  return { getUserInfo, refresh }
}
export default useLogic
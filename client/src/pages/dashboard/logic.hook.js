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
const useLogic = () => {
  const dispatch = useDispatch()
  const { chat } = useSelector(extractChatSlice)
  const navigate = useNavigate()
  const user = useSelector(extractUserSlice)
  useEffect(() => {
    dispatch(removeChat({}))
  }, [])
  useEffect(() => {
    console.log("sdlkfjads;f")
    if (Object.keys(chat).length == 0)
      console.log("wohooo")
    console.log("sdlkfjads;f")
  }, [chat])
  async function refresh() {
    try {
      const data = await authDataSource.refresh({})
      dispatch(setUser(data.user))
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
  return { getUserInfo, refresh }
}
export default useLogic
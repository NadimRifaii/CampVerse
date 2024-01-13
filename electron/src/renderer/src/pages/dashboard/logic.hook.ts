import { extractUserSlice, setUser, updateUser } from "@renderer/core/datasource/localDataSource/user/userSlice"
import { authDataSource } from "@renderer/core/datasource/remoteDataSource/auth"
import { userDataSource } from "@renderer/core/datasource/remoteDataSource/user"
import { local } from "@renderer/core/helpers/localStorage"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const useLogic = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(extractUserSlice)
  async function refresh() {
    try {
      const data = await authDataSource.refresh({})
      dispatch(setUser(data.user))
      local("token", data.token)
    } catch (error) {
      return navigate('/')
    }
  }
  async function getUserInfo() {
    try {
      const data = await userDataSource.getUser({})
      dispatch(updateUser(data.info))
    } catch (error: any) {
      console.log(error)
    }
  }
  return { getUserInfo, refresh }
}
export default useLogic
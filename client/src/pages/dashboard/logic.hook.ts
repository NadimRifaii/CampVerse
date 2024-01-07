import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { userDataSource } from "../../core/datasource/remoteDataSource/user"
import { authDataSource } from '../../core/datasource/remoteDataSource/auth'
import { setUser, updateUser } from '../../core/datasource/localDataSource/user/userSlice'
import { local } from '../../core/helpers/localStorage'
import { useNavigate } from "react-router-dom"
const useLogic = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(extractUserSlice)
  console.log(user)
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
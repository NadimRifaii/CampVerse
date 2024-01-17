import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"

const useLogic = () => {
  const user = useSelector(extractUserSlice)
  return { user }
}
export default useLogic
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../../core/types/user"
const useLogic = () => {
  const user = useSelector(extractUserSlice)

}
export default useLogic
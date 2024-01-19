import { extractSubmissionsSlice } from "../../core/datasource/localDataSource/submissions/submissionsSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { extractCurrentAssignmentSlice } from "../../core/datasource/localDataSource/currentAssignment/currentAssignmentSlice"
import { useEffect } from "react"
import { local } from "../../core/helpers/localStorage"
const useLogic = () => {
  const { submissions } = useSelector(extractSubmissionsSlice)
  const user = useSelector(extractUserSlice)
  const { assignment: currentAssignment } = useSelector(extractCurrentAssignmentSlice)
  const navigate = useNavigate()
  useEffect(() => {
    if (user.role != "mentor") {
      local("token", "xxx")
      local("currentBootcamp", "sdfasdf")
      navigate('/')
    }
  }, [user])
  return { submissions, currentAssignment }
}
export default useLogic
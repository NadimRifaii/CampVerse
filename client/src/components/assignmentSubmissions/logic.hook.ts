import { extractSubmissionsSlice } from "../../core/datasource/localDataSource/submissions/submissionsSlice"
import { useSelector } from "react-redux"
import { extractCurrentAssignmentSlice } from "../../core/datasource/localDataSource/currentAssignment/currentAssignmentSlice"
const useLogic = () => {
  const { submissions } = useSelector(extractSubmissionsSlice)
  const { assignment: currentAssignment } = useSelector(extractCurrentAssignmentSlice)
  return { submissions, currentAssignment }
}
export default useLogic
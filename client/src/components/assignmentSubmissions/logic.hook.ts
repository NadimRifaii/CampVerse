import { extractSubmissionsSlice } from "../../core/datasource/localDataSource/submissions/submissionsSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { extractCurrentAssignmentSlice } from "../../core/datasource/localDataSource/currentAssignment/currentAssignmentSlice"
import { useEffect, useState } from "react"
import { local } from "../../core/helpers/localStorage"
import { submissionsDataSource } from "../../core/datasource/remoteDataSource/submissions"
import toast from "react-hot-toast"
const useLogic = () => {
  const { submissions } = useSelector(extractSubmissionsSlice)
  const user = useSelector(extractUserSlice)
  const { assignment: currentAssignment } = useSelector(extractCurrentAssignmentSlice)
  const [feedback, setFeedback] = useState<string>("")
  const navigate = useNavigate()
  useEffect(() => {
    if (user.role != "mentor") {
      local("token", "xxx")
      local("currentBootcamp", "sdfasdf")
      navigate('/')
    }
  }, [user])
  const getAiFeedback = async (fileUrl: string) => {
    const loadingToastId = toast.loading('Getting feedback...');
    try {
      const response = await submissionsDataSource.getAiFeedback({ fileUrl })
      toast.success(`Feedback done!`, { id: loadingToastId })
      const message = response.feedback + `
      \n I would give him ${response.grade}/10
      `
      setFeedback(message)
      return response
    } catch (error: any) {
      toast.error(`${error.message}`, { id: loadingToastId });
    }
  }
  return { submissions, currentAssignment, feedback, getAiFeedback, setFeedback }
}
export default useLogic
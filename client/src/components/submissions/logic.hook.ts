import { useDispatch, useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { submissionsDataSource, } from "../../core/datasource/remoteDataSource/submissions"
import { useEffect } from "react"
import { extractSubmissionsSlice, setSubmissions } from "../../core/datasource/localDataSource/submissions/submissionsSlice"
import toast from "react-hot-toast"

const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const { submissions } = useSelector(extractSubmissionsSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    getStudentSubmissions()
  }, [user])
  const getStudentSubmissions = async () => {
    try {
      const response = await submissionsDataSource.getStudentSubmissions({})
      dispatch(setSubmissions(response.submissions))
    } catch (error) {
    }
  }
  return { user, submissions, getStudentSubmissions }
}
export default useLogic
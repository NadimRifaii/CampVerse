import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"

import toast from "react-hot-toast"
import { extractCurrentAssignmentSlice } from "../../core/datasource/localDataSource/currentAssignment/currentAssignmentSlice"
import { submissionsDataSource } from "../../core/datasource/remoteDataSource/submissions"
type InstructionType = {
  instructionTitle: string,
  content: string
}
type FileType = {
  fileName: string,
  fileType: string,
  fileUrl: string
}
type Stack = {
  name: string
}
export type CurriculumType = {
  title: string,
  stacks: [Stack]
}

const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const dispatch = useDispatch()
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const { assignment } = useSelector(extractCurrentAssignmentSlice)

  useEffect(() => {
    console.log(assignment)
  }, [])
  const submitAssignment = async () => {
    const loadingToastId = toast.loading('Submitting...');
    if (uploadedFiles.length == 0) {
      toast.error(`Invalid credentials`, { id: loadingToastId });
      return
    }
    try {
      const data = {
        stackName: assignment.stackName,
        assignmentTitle: assignment.assignmentTitle,
        files: uploadedFiles
      }
      const response = await submissionsDataSource.submitAssignment(data)
      toast.success(`Assignment created successfully`, { id: loadingToastId })
      setUploadedFiles([])
    } catch (error) {
      setUploadedFiles([])
      toast.error(`${error}`, { id: loadingToastId });
    }
  }
  return { user, uploadedFiles, assignment, setUploadedFiles, submitAssignment }
}
export default useLogic
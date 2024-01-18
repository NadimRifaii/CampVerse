import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import toast from "react-hot-toast"
import { assignmentDataSource } from "../../core/datasource/remoteDataSource/assignment"
import { curriculumsDataSource } from "../../core/datasource/remoteDataSource/curriculums"
import { extractCurriculumsSlice, setCurriculums } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"
import { extractCurrentAssignmentSlice } from "../../core/datasource/localDataSource/currentAssignment/currentAssignmentSlice"
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
  return { user, uploadedFiles, assignment, setUploadedFiles, }
}
export default useLogic
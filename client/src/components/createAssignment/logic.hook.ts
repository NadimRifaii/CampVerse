import { useState } from "react"
import { useSelector } from 'react-redux'
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
type InstructionType = {
  instructionTitle: string,
  content: string
}
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [assignmentTitle, setAssignmentTitle] = useState<string>("")
  const [instructions, setInstructions] = useState<InstructionType[]>([])
  const [assignmentFiles, setAssignmentFiles] = useState()
  return { user, currentDate }
}
export default useLogic
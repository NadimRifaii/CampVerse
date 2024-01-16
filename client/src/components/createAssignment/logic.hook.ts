import { useState } from "react"
import { useSelector } from 'react-redux'
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
type InstructionType = {
  instructionTitle: string,
  content: string
}
type FileType = {
  fileName: string,
  fileType: string,
  fileUrl: string
}
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [currentDate, setCurrentDate] = useState<Date | string>("")
  const [assignmentTitle, setAssignmentTitle] = useState<string>("")
  const [instructions, setInstructions] = useState<InstructionType[]>([{
    instructionTitle: "",
    content: ''
  }])
  const updateInstructionTitle = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index].instructionTitle = value;
    setInstructions(updatedInstructions);
  };

  const updateInstructionContent = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index].content = value;
    setInstructions(updatedInstructions);
  };
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  return { user, currentDate, uploadedFiles, assignmentTitle, instructions, updateInstructionContent, updateInstructionTitle, setInstructions, setAssignmentTitle, setUploadedFiles }
}
export default useLogic
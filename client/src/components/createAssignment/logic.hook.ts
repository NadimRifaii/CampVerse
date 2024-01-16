import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
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
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const [currentDate, setCurrentDate] = useState<Date | string>("")
  const [assignmentTitle, setAssignmentTitle] = useState<string>("")
  const [instructions, setInstructions] = useState<InstructionType[]>([{
    instructionTitle: "",
    content: ''
  }])
  useEffect(() => {
    console.log(currentBootcamp)
  }, [currentBootcamp])
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
  const createAssignment = async () => {
    console.log({
      bootcampName: currentBootcamp.name,
      assignment: {
        files: uploadedFiles,
        instructions
      }
    })
  }
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  return { user, currentDate, uploadedFiles, assignmentTitle, instructions, createAssignment, setCurrentDate, updateInstructionContent, updateInstructionTitle, setInstructions, setAssignmentTitle, setUploadedFiles }
}
export default useLogic
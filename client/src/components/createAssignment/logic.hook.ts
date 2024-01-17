import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import toast from "react-hot-toast"
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
  const [dueDate, setDueDate] = useState<Date | string>("")
  const [assignmentTitle, setAssignmentTitle] = useState<string>("")
  const [stackName, setStackName] = useState<string>("")
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
    const loadingToastId = toast.loading('Posting...');
    if (!stackName || !dueDate || !assignmentTitle) {
      toast.error(`Invalid credentials`, { id: loadingToastId });
    } else {
      toast.success(`Assignment created successfully`, { id: loadingToastId })
    }
    console.log({
      bootcampName: currentBootcamp.name,
      stackName: stackName,
      dueDate: dueDate,
      assignment: {
        files: uploadedFiles,
        instructions
      }
    })
  }
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  return { user, dueDate, uploadedFiles, assignmentTitle, instructions, stackName, setStackName, createAssignment, setDueDate, updateInstructionContent, updateInstructionTitle, setInstructions, setAssignmentTitle, setUploadedFiles }
}
export default useLogic
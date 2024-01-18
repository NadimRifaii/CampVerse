import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import toast from "react-hot-toast"
import { assignmentDataSource } from "../../core/datasource/remoteDataSource/assignment"
import { curriculumsDataSource } from "../../core/datasource/remoteDataSource/curriculums"
import { extractCurriculumsSlice, setCurriculums } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"
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
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const dispatch = useDispatch()
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
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




  return { user, uploadedFiles, setUploadedFiles }
}
export default useLogic
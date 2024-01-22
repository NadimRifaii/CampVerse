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
  stacks: Stack[]
}

const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const dispatch = useDispatch()
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const [dueDate, setDueDate] = useState<any>(new Date())
  const [assignmentTitle, setAssignmentTitle] = useState<string>("")
  const [stackName, setStackName] = useState<string>("")
  const [bootcampStacks, setBoocampStacks] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const [instructions, setInstructions] = useState<InstructionType[]>([{
    instructionTitle: "",
    content: ''
  }])
  useEffect(() => {
    setBoocampStacks([])
  }, [])
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
  useEffect(() => {
    getBootcampCurriculum()
  }, [currentBootcamp])
  const getBootcampCurriculum = async () => {
    try {
      const response = await curriculumsDataSource.getCurriculums({ id: currentBootcamp.id })
      dispatch(setCurriculums(response))
    } catch (error) {
    }
  }
  useEffect(() => {
    const arr: string[] = []
    curriculums.map((curriculum: CurriculumType) => {
      curriculum.stacks.map((stack: Stack) => {
        arr.push(stack.name)
      })
    })
    setBoocampStacks(arr)
  }, [curriculums])
  const createAssignment = async () => {
    console.log("dsfadsfdasf")
    console.log(
      {
        bootcampName: currentBootcamp.name,
        stackName: stackName,
        dueDate: `${dueDate}`,
        assignment: {
          files: uploadedFiles,
          instructions
        }
      }
    )
    console.log("dsfadsfdasf")
    const loadingToastId = toast.loading('Posting...');
    if (!stackName || !dueDate || !assignmentTitle) {
      toast.error(`Invalid credentials`, { id: loadingToastId });
    } else {
      try {

        const response = await assignmentDataSource.createAssignment({
          bootcampName: currentBootcamp.name,
          stackName: stackName,
          dueDate: `${dueDate}`,
          assignment: {
            assignmentTitle,
            dueDate: `${dueDate}`,
            files: uploadedFiles,
            instructions
          }
        })
        toast.success(`Assignment created successfully`, { id: loadingToastId })
        setStackName("")
        setAssignmentTitle("")
        setInstructions([{
          instructionTitle: "",
          content: ''
        }])
        setUploadedFiles([])
      } catch (error) {
        toast.error(`${error}`, { id: loadingToastId });
      }
    }
  }

  return { user, dueDate, uploadedFiles, assignmentTitle, instructions, stackName, bootcampStacks, setStackName, createAssignment, setDueDate, updateInstructionContent, updateInstructionTitle, setInstructions, setAssignmentTitle, setUploadedFiles }
}
export default useLogic
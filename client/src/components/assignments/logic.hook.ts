import { useSelector } from "react-redux"
import { Assignment, extractAssignmentsSlice, setAssignments } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
import { useEffect, useState } from "react"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { assignmentDataSource } from "../../core/datasource/remoteDataSource/assignment"
import { useDispatch } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import toast from "react-hot-toast"
const useLogic = () => {
  const { assignments } = useSelector(extractAssignmentsSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const user = useSelector(extractUserSlice)
  const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>([])
  const [oldAssignments, setOldAssignments] = useState<Assignment[]>([])
  const dispatch = useDispatch()
  useEffect(() => {
    fetchBootcampAssignments()
  }, [])
  useEffect(() => {
    categorizeAssignments(assignments)

  }, [assignments])

  const fetchBootcampAssignments = async () => {
    const loadingToastId = toast.loading('Checking for new assignments...');
    try {
      const response = await assignmentDataSource.getBootcampAssignments({ id: currentBootcamp.id })
      if (response?.length > 0) {
        console.log(response)
        dispatch(setAssignments(cleanAssignmentData(response)))
        toast.success('Check for new assignments is done', { id: loadingToastId });
      }
      else
        throw new Error('No assignments')
    } catch (error) {
      toast.error(`${error}`, { id: loadingToastId });
    }
  }
  function cleanAssignmentData(response: any) {
    let arr: any[] = []
    for (let i = 0; i < response?.length; i++) {
      const { title: assignmentTitle, assignmentFiles, dueDate, instructions: allInstructions, stack: { name: stackName } } = response[i]
      const instructions: {}[] = []
      for (let i = 0; i < allInstructions?.length; i++) {
        const { instructionTitle, content } = allInstructions[i]
        instructions.push({ instructionTitle, content })
      }
      arr.push({
        assignmentTitle,
        dueDate: `${dueDate}`,
        stackName,
        assignmentFiles,
        instructions
      })
    }
    return arr
  }
  const categorizeAssignments = (assignments: Assignment[]) => {
    const currentDate = new Date()
    const upcoming = assignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return currentDate < dueDate;
    });
    console.log('cadf')
    const old = assignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return currentDate >= dueDate;
    });
    setUpcomingAssignments(upcoming)
    setOldAssignments(old)
  }
  return { assignments, oldAssignments, upcomingAssignments, user, fetchBootcampAssignments }
}
export default useLogic
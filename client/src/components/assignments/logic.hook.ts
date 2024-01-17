import { useSelector } from "react-redux"
import { Assignment, extractAssignmentsSlice, setAssignments } from "../../core/datasource/localDataSource/assignments/assignmentsSlice"
import { useEffect, useState } from "react"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { assignmentDataSource } from "../../core/datasource/remoteDataSource/assignment"
import { useDispatch } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
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
    try {
      const response = await assignmentDataSource.getBootcampAssignments({ id: currentBootcamp.id })
      dispatch(setAssignments(cleanAssignmentData(response)))
    } catch (error) {
      console.log(error)
    }
  }
  function cleanAssignmentData(response: any) {
    let arr: any[] = []
    for (let i = 0; i < response.length; i++) {
      const { title: assignmentTitle, assignmentFiles, dueDate, instructions: allInstructions, stack: { name: stackName } } = response[i]
      const instructions: {}[] = []
      for (let i = 0; i < allInstructions.length; i++) {
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

    const old = assignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return currentDate >= dueDate;
    });
    setUpcomingAssignments(upcoming)
    setOldAssignments(old)
  }
  return { assignments, oldAssignments, upcomingAssignments, user }
}
export default useLogic
import { useEffect, useState } from "react"
import { Stack } from "../../core/types/stack"
import { User } from "../../core/types/user"
import { Grade } from "../../core/datasource/localDataSource/results/resultsSlice"
/**
 * {
    "bootcampId":4,
    "userId":4,
    "grades":[
        {
            "stackId":1,
            "score":450
        },{
            "stackId":2,
            "score":950
        },{
            "stackId":3,
            "score":350
        }
    ]
}
 */
type Request = {
  bootcampId: number,
  grades: {
    stackId: number,
    score?: number
  }[],
  userId?: number
}
type CreateResultProps = {
  stacks: Stack[],
  students: User[]
}
const CreateResultTable = ({ stacks, students }: CreateResultProps) => {
  const [request, setRequest] = useState<Request[]>([])
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, stack: Stack) => {
    setRequest((prevState) => {
      const studentIndex = prevState.findIndex((student) => {
        return student.userId === student.userId
      })
      const studentGrades = prevState[studentIndex].grades
      studentGrades.map((studentGrade, index) => {
        if (studentGrade.stackId === stack.ID) {
          studentGrade.score = +event.target.value
        }
      })
      return [...prevState]
    })
  }
  useEffect(() => {
    if (!students || !stacks)
      return
    const arr: Request[] = []
    students.forEach((student, index) => {
      const { userId } = student
      const grades: Request[`grades`] = []
      stacks.forEach((stack, stackIndex) => {
        const { ID: stackId } = stack
        const grade = {
          stackId,
          score: undefined
        }
        grades.push(grade)
      })
      arr.push({
        bootcampId: 1,
        userId,
        grades
      })
    })
    setRequest(arr)
  }, [students, stacks])

  useEffect(() => {
    console.log(request)
  }, [request])
  return (
    <table className="results-table" >
      <thead>
        <tr>
          <th>Student name</th>
          {
            stacks.map((stack: Stack, index: number) => (
              <th key={index} >{stack.name}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          students.map((student: User, index: number) => {
            const { username } = student
            return (
              <tr key={index} >
                <td>{username.split(" ")[0]}</td>
                {
                  stacks.map((stack: Stack, index: number) => {
                    return (
                      <td key={index}>
                        <input type="text" placeholder={`Grade for ${stack.name}`} />
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
export default CreateResultTable
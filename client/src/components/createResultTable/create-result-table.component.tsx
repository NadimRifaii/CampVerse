import { useEffect, useState } from "react"
import { Stack } from "../../core/types/stack"
import { User } from "../../core/types/user"
import useLogic from "./logic.hook"
import { Button } from "../common/button/button.component"
import './create-result-table.styles.css'
export type Request = {
  bootcampId: number,
  grades: {
    stackId: number,
    score?: number
  }[],
  userId?: number
}
type CreateResultProps = {
  stacks: Stack[],
  students: User[],
  currentWeek: number,
  getBootcampWeeklyResults: () => Promise<void>
}
const CreateResultTable = ({ stacks, students, currentWeek, getBootcampWeeklyResults }: CreateResultProps) => {
  const { setRequest, changeHandler, createWeeklyResults } = useLogic(currentWeek, getBootcampWeeklyResults)
  useEffect(() => {
    if (!students || !stacks)
      return
    const arr: Request[] = []
    students.forEach((student, index) => {
      const { id: userId } = student
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
  return (
    <form action="" className="create-result-form" onSubmit={(e) => {
      e.preventDefault()
      createWeeklyResults()

    }}>
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
            students.map((student: User, studentIndex: number) => {
              const { username } = student
              return (
                <tr key={studentIndex} >
                  <td>{username.split(" ")[0]}</td>
                  {
                    stacks.map((stack: Stack, index: number) => {
                      return (
                        <td key={index}>
                          <input type="text" required onChange={(e) => {
                            changeHandler(e, stack, student.id || 0)
                          }} placeholder={`Grade for ${stack.name}`} />
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
      <div className="btn-container">
        <Button text="Create result" />
      </div>
    </form>
  )
}
export default CreateResultTable
import { Stack } from "../../core/types/stack"
import { User } from "../../core/types/user"

type CreateResultProps = {
  stacks: Stack[],
  students: User[]
}
const CreateResultTable = ({ stacks, students }: CreateResultProps) => {
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
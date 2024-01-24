import { Grade, Result } from "../../core/datasource/localDataSource/results/resultsSlice"
import { Stack } from "../../core/types/stack";
import { User } from "../../core/types/user";

type ResultsTableProps = {
  results: Result[],
  stacks: Stack[],
  students: User[],
  user: User
}
const ResultsTable = ({ results, stacks, students, user }: ResultsTableProps) => {
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
          results.length > 0 ?
            results.map((result: Result, index: number) => {
              const { User, grades } = result
              return (
                <tr key={index} >
                  <td>{User.username.split(" ")[0]}</td>
                  {
                    grades.map((grade: Grade, index: number) => {
                      return (
                        <td key={index}>{grade.score}</td>
                      )
                    })
                  }
                </tr>
              )
            })
            :
            <tr>
              <td>{user.username}</td>
              {
                stacks.map((_, sIndex: number) => (
                  <td key={sIndex} >
                    <input disabled placeholder="-" />
                  </td>
                ))
              }
            </tr>
        }
      </tbody>
    </table>
  );

}
export default ResultsTable
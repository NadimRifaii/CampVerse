import { Grade, Result } from "../../core/datasource/localDataSource/results/resultsSlice"
import { Stack } from "../../core/types/stack";

type ResultsTableProps = {
  results: Result[],
  stacks: Stack[]
}
const ResultsTable = ({ results, stacks }: ResultsTableProps) => {
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
        }
      </tbody>
    </table>
  );

}
export default ResultsTable
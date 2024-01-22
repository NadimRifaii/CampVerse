import { Grade, Result } from "../../core/datasource/localDataSource/results/resultsSlice"

type ResultsTableProps = {
  results: Result[],
  stacks: string[]
}
const ResultsTable = ({ results, stacks }: ResultsTableProps) => {
  return (
    <table className="results-table" >
      <thead>
        <tr>
          <th>Student name</th>
          {
            stacks.map((stack: string, index: number) => (
              <th key={index} >{stack}</th>
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
                <td>{result.User.username}</td>
                {
                  grades.map((grade: Grade, index: number) => {
                    return (
                      <>
                        <td>{grade.score}</td>
                      </>
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
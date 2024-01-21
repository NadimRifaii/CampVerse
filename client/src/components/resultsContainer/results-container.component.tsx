import { useEffect } from "react"
import useLogic from "./logic.hook"

const ResultsContainer = () => {
  const { results } = useLogic();

  useEffect(() => {
    console.log("asdffda");
  }, []);

  return (
    <div className="all-results">
      {results.map((result, index) => (
        <div className="re" key={index}>
          <h2>Week: {result.week}</h2>
          <table>
            <thead>
              <tr>
                <th>Stack Name</th>
                <th>Student Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {result.grades.map((grade, gradeIndex) => (
                <tr key={gradeIndex}>
                  <td>{grade.stackName}</td>
                  <td>{grade.User.firstname}</td>
                  <td>{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ResultsContainer;

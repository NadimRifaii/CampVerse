import React, { useEffect, useState } from "react";
import useLogic from "./logic.hook";
import { CurriculumType } from "../createAssignment/logic.hook";
import { Grade, Result } from "../../core/datasource/localDataSource/results/resultsSlice";

type Stack = {
  name: string
}
// Update the ResultsContainer component
const ResultsContainer = () => {
  const { results, curriculums } = useLogic();
  const [stacks, setStacks] = useState<string[]>([])
  useEffect(() => {
    let arr: string[] = []
    curriculums.map((curriculum: CurriculumType, index: number) => {
      curriculum.stacks.map((stack: Stack, stackIndex: number) => {
        arr.push(stack.name)
      })
    })
    setStacks(arr)
  }, [curriculums])
  useEffect(() => {
    console.log(results)
  }, [results])
  return (
    <div className="results-container">
      <table>
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
                <tr>
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
    </div>
  );
};

export default ResultsContainer
import React, { useEffect, useState } from "react";
import useLogic from "./logic.hook";
import { CurriculumType } from "../createAssignment/logic.hook";
import { Grade, Result } from "../../core/datasource/localDataSource/results/resultsSlice";
import './results-container.styles.css'
import { Stack } from "../../core/types/stack";
import ResultsTable from "../resultsTable/results-table.component";

const ResultsContainer = () => {
  const { results, curriculums, currentBootcamp } = useLogic();
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
  useEffect(() => {
    console.log(currentBootcamp)
  }, [currentBootcamp])
  return (
    <div className="results-container">
      <div className="select-box">
        <select name="week" id="">
          {
            currentBootcamp?.weeks.map((week, index: number) => {
              return (
                <option value={week.ID} key={index}>Week {week.ID}</option>
              )
            })
          }
        </select>
      </div>
      <ResultsTable results={results} stacks={stacks} />
    </div>
  );
};

export default ResultsContainer
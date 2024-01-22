import React, { useEffect, useState } from "react";
import useLogic from "./logic.hook";
import { CurriculumType } from "../createAssignment/logic.hook";
import { Stack } from "../../core/types/stack";
import ResultsTable from "../resultsTable/results-table.component";
import Select from 'react-select'
import './results-container.styles.css';

const ResultsContainer = () => {
  const { results, curriculums, currentBootcamp, currentWeek } = useLogic();
  const [stacks, setStacks] = useState<string[]>([]);

  useEffect(() => {
    let arr: string[] = [];
    curriculums.map((curriculum: CurriculumType, index: number) => {
      curriculum.stacks.map((stack: Stack, stackIndex: number) => {
        arr.push(stack.name);
      });
    });
    setStacks(arr);
  }, [curriculums]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  useEffect(() => {
    console.log(currentBootcamp);
  }, [currentBootcamp]);

  return (
    <div className="results-container">
      <div className="select-box">
        <Select
          onChange={() => {
            console.log("alksdjfadsf")
          }}
          options={currentBootcamp?.weeks.map((week, index: number) => ({
            value: week.ID,
            label: `Week ${week.ID}`,
          }))}
          defaultValue={{
            value: currentWeek,
            label: `Week ${currentWeek}`,
          }}
        />
      </div>
      <ResultsTable results={results} stacks={stacks} />
    </div>
  );
};

export default ResultsContainer;

import React, { useEffect, useState } from "react";
import useLogic from "./logic.hook";
import { CurriculumType } from "../createAssignment/logic.hook";
import { Stack } from "../../core/types/stack";
import ResultsTable from "../resultsTable/results-table.component";
import Select from 'react-select'
import './results-container.styles.css';
import CreateResultTable from "../createResultTable/create-result-table.component";

const ResultsContainer = () => {
  const { results, curriculums, currentBootcamp, currentWeek, students, setCurrentWeek } = useLogic();
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
    console.log(students)
  }, [students])

  return (
    <div className="results-container">
      <div className="select-box">
        <Select
          onChange={(value) => {
            setCurrentWeek(value?.value || 1)
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
      {
        results.length > 0 ?
          <ResultsTable results={results} stacks={stacks} /> :
          <CreateResultTable />
      }
    </div>
  );
};

export default ResultsContainer;

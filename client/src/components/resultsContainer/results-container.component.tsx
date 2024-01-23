import React, { useEffect, useState } from "react";
import useLogic from "./logic.hook";
import { CurriculumType } from "../createAssignment/logic.hook";
import { Stack } from "../../core/types/stack";
import ResultsTable from "../resultsTable/results-table.component";
import Select from 'react-select'
import './results-container.styles.css';
import CreateResultTable from "../createResultTable/create-result-table.component";

const ResultsContainer = () => {
  const { results, curriculums, currentBootcamp, currentWeek, students, user, setCurrentWeek, getBootcampWeeklyResults } = useLogic();
  const [stacks, setStacks] = useState<Stack[]>([]);
  useEffect(() => {
    let arr: Stack[] = [];
    curriculums.map((curriculum: CurriculumType, index: number) => {
      curriculum.stacks.map((stack: Stack, stackIndex: number) => {
        arr.push(stack);
      });
    });
    setStacks(arr);
  }, [curriculums]);
  return (
    <div className="results-container">
      <div className="select-box">
        <Select
          onChange={(value) => {
            setCurrentWeek(value?.value || 1)
          }}
          options={currentBootcamp?.weeks.map((week, index: number) => ({
            value: week.ID,
            label: `Week ${index + 1}`,
          }))}
          defaultValue={{
            value: currentWeek,
            label: `Week ${currentWeek}`,
          }}
        />
      </div>
      {
        user.role == "student" ? <ResultsTable results={results} stacks={stacks} /> :
          results.length > 0 ?
            <ResultsTable results={results} stacks={stacks} /> :
            <CreateResultTable students={students} stacks={stacks} currentWeek={currentWeek} getBootcampWeeklyResults={getBootcampWeeklyResults} />
      }
    </div>
  );
};

export default ResultsContainer;

import React, { useEffect, useState } from "react";
import useLogic from "./logic.hook";
import { CurriculumType } from "../createAssignment/logic.hook";
import { Stack } from "../../core/types/stack";
import ResultsTable from "../resultsTable/results-table.component";
import Select from 'react-select'
import './results-container.styles.css';
import CreateResultTable from "../createResultTable/create-result-table.component";
import toast from "react-hot-toast";

const ResultsContainer = () => {
  const { results, curriculums, currentBootcamp, currentWeek, students, user, weekStacks: stacks, setWeekStacks, setCurrentWeek, getBootcampWeeklyResults } = useLogic();
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
        results.length > 0 && stacks.length > 0 ?
          user.role == "student" ? <ResultsTable user={user} students={students} results={results} stacks={stacks} /> :
            <ResultsTable user={user} students={students} results={results} stacks={stacks} /> :
          <CreateResultTable students={students} stacks={stacks} currentWeek={currentWeek} getBootcampWeeklyResults={getBootcampWeeklyResults} />
      }
    </div>
  );
};

export default ResultsContainer;

import { useState } from "react"
import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useSelector } from "react-redux"
const useLogic = () => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice);
  const [currentCurriculum, setCurrentCurriculum] = useState('')
  const [stacksArray, setStacksArray] = useState([{
    name: ""
  }])
  console.log({
    bootcampId: currentBootcamp.id,
    title: currentCurriculum,
    stacks: stacksArray
  })
  const currentCurriculumChangeHandler = (e) => {
    setCurrentCurriculum(e.target.value)
  }
  const addNewStack = () => {
    if (stacksArray[stacksArray.length - 1].name != "")
      setStacksArray([...stacksArray, { ['name']: "" }])
  }
  const updateStack = (index: number, newName: string) => {
    const updatedStacksArray = [...stacksArray];
    updatedStacksArray[index] = { name: newName };
    setStacksArray(updatedStacksArray);
  };
  return { stacksArray, updateStack, addNewStack, currentCurriculum, currentCurriculumChangeHandler };
};

export default useLogic;

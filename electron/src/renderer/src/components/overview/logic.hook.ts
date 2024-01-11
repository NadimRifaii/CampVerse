import { useState, useEffect } from "react"
import { extractCurriculumsSlice, setCurriculums } from "@renderer/core/datasource/localDataSource/curriculums/curriculumsSlice";
import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useSelector, useDispatch } from "react-redux"
import { curriculumsDataSource } from "@renderer/core/datasource/remoteDataSource/curriculums";
const useLogic = () => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice);
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const response = await curriculumsDataSource.getCurriculums({ ["id"]: currentBootcamp.id })
        dispatch(setCurriculums(response))
      } catch (error) {
        console.log(error)
      }
    }
    fetchCurriculums()
  }, [])

  const [currentCurriculum, setCurrentCurriculum] = useState('')
  const [stacksArray, setStacksArray] = useState([{
    name: ""
  }])
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

  return { stacksArray, currentCurriculum, curriculums, updateStack, addNewStack, currentCurriculumChangeHandler };
};

export default useLogic;

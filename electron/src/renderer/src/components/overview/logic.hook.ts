import { useState, useEffect } from "react"
import { extractCurriculumsSlice, setCurriculums } from "@renderer/core/datasource/localDataSource/curriculums/curriculumsSlice";
import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useSelector, useDispatch } from "react-redux"
import { curriculumsDataSource } from "@renderer/core/datasource/remoteDataSource/curriculums";
const useLogic = () => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice);
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const [activeAddModal, setActiveAddModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  useEffect(() => {

    fetchCurriculums()
  }, [])
  const fetchCurriculums = async () => {
    try {
      const response = await curriculumsDataSource.getCurriculums({ ["id"]: currentBootcamp.id })
      dispatch(setCurriculums(response))
    } catch (error) {
      console.log(error)
    }
  }
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
  const saveCurriculum = async () => {
    if (currentCurriculum != "" && stacksArray[stacksArray.length - 1].name != "") {
      try {
        const response = await curriculumsDataSource.addCurriculumToBootcamp({
          bootcampId: currentBootcamp.id,
          title: currentCurriculum,
          stacks: stacksArray
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
      setCurrentCurriculum('')
      setStacksArray([{
        name: ""
      }])
      await fetchCurriculums()
    }
  }
  return { stacksArray, currentCurriculum, curriculums, activeAddModal, setActiveAddModal, updateStack, addNewStack, currentCurriculumChangeHandler, saveCurriculum };
};

export default useLogic;

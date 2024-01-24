import { useState, useEffect } from "react"
import { extractCurriculumsSlice, setCurriculums } from "@renderer/core/datasource/localDataSource/curriculums/curriculumsSlice";
import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useSelector, useDispatch } from "react-redux"
import { curriculumsDataSource } from "@renderer/core/datasource/remoteDataSource/curriculums";
import toast from "react-hot-toast";
const useLogic = () => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice);
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const [activeAddModal, setActiveAddModal] = useState<boolean>(false)
  const [currentWeek, setCurrentWeek] = useState<number>(currentBootcamp?.weeks[0]?.ID || 1)
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
    let loadingToastId = ''
    if (currentCurriculum != "" && stacksArray[stacksArray.length - 1].name != "") {
      try {
        loadingToastId = toast.loading('Creating the curriculum...');
        const response = await curriculumsDataSource.addCurriculumToBootcamp({
          bootcampId: currentBootcamp.id,
          weekId: currentWeek,
          title: currentCurriculum,
          stacks: stacksArray
        })
        toast.success("Curriculum created successfully", { id: loadingToastId })
      } catch (error) {
        toast.error("This week already has a curriculum", { id: loadingToastId })
      }
      setCurrentCurriculum('')
      setStacksArray([{
        name: ""
      }])
      await fetchCurriculums()
    }
  }
  useEffect(() => {
    console.log(currentBootcamp)
  }, [])
  return { stacksArray, currentCurriculum, curriculums, activeAddModal, currentBootcamp, currentWeek, setCurrentWeek, setActiveAddModal, updateStack, addNewStack, currentCurriculumChangeHandler, saveCurriculum };
};

export default useLogic;

import { useSelector, useDispatch } from "react-redux"
import { extractResultsSlice, setResults, removeResults } from "../../core/datasource/localDataSource/results/resultsSlice"
import { extractCurriculumsSlice } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useEffect, useState } from "react"
import { resultsDataSource } from "../../core/datasource/remoteDataSource/results"
import { extractUsersSlice } from "../../core/datasource/localDataSource/users/usersSlice"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { curriculumsDataSource } from "../../core/datasource/remoteDataSource/curriculums"

const useLogic = () => {
  const { results } = useSelector(extractResultsSlice)
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  useEffect(() => {
    console.log(currentBootcamp)
  }, [])
  const { students } = useSelector(extractUsersSlice)
  const user = useSelector(extractUserSlice)
  const dispatch = useDispatch()
  const [currentWeek, setCurrentWeek] = useState<number>(currentBootcamp?.weeks[0]?.ID || 1)
  const [weekStacks, setWeekStacks] = useState<{ ID: number, name: string }[]>([])
  const getBootcampWeeklyResults = async () => {
    try {
      const response = await resultsDataSource.getBootcampWeeklyResults({ weekId: currentWeek })
      dispatch(setResults(response.results))
    } catch (error) {
      console.log(error)
    }
  }
  const getUserWeeklyResults = async () => {
    try {
      const response = await resultsDataSource.getUserWeeklyResults({ weekId: currentWeek, userId: user.UserId })
      dispatch(setResults(response.results))
    } catch (error) {
      console.log(error)
    }
  }
  const getWeekStacks = async () => {
    try {
      const id = currentWeek
      const stacks = await curriculumsDataSource.getWeekCurriculum({ id })
      setWeekStacks(stacks)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dispatch(removeResults({}))
    setWeekStacks([])
    getWeekStacks()
  }, [currentWeek])
  useEffect(() => {
    if (user.role == 'student') {
      getUserWeeklyResults()
    } else {
      getBootcampWeeklyResults()
    }
  }, [currentBootcamp, currentWeek, user])
  return { results, curriculums, currentBootcamp, currentWeek, students, user, weekStacks, setWeekStacks, setCurrentWeek, getBootcampWeeklyResults }
}
export default useLogic
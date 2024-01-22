import { useSelector, useDispatch } from "react-redux"
import { extractResultsSlice, setResults } from "../../core/datasource/localDataSource/results/resultsSlice"
import { extractCurriculumsSlice } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useEffect, useState } from "react"
import { resultsDataSource } from "../../core/datasource/remoteDataSource/results"
import { extractUsersSlice } from "../../core/datasource/localDataSource/users/usersSlice"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"

const useLogic = () => {
  const { results } = useSelector(extractResultsSlice)
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const { students } = useSelector(extractUsersSlice)
  const user = useSelector(extractUserSlice)
  const dispatch = useDispatch()
  const [currentWeek, setCurrentWeek] = useState<number>(currentBootcamp?.weeks[0]?.ID || 1)
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
      const response = await resultsDataSource.getUserWeeklyResults({ weekId: currentWeek, userId: user.ID })
      dispatch(setResults(response.results))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (user.role == 'student') {
      getUserWeeklyResults()
    } else {
      getBootcampWeeklyResults()
    }
  }, [currentBootcamp, currentWeek])
  return { results, curriculums, currentBootcamp, currentWeek, students, user, setCurrentWeek, getBootcampWeeklyResults }
}
export default useLogic
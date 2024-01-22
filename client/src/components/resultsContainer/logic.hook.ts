import { useSelector, useDispatch } from "react-redux"
import { extractResultsSlice, setResults } from "../../core/datasource/localDataSource/results/resultsSlice"
import { extractCurriculumsSlice } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useEffect, useState } from "react"
import { resultsDataSource } from "../../core/datasource/remoteDataSource/results"
import { extractUsersSlice } from "../../core/datasource/localDataSource/users/usersSlice"

const useLogic = () => {
  const { results } = useSelector(extractResultsSlice)
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const { students } = useSelector(extractUsersSlice)
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
  useEffect(() => {
    getBootcampWeeklyResults()
  }, [currentBootcamp, currentWeek])
  return { results, curriculums, currentBootcamp, currentWeek, students, setCurrentWeek, getBootcampWeeklyResults }
}
export default useLogic
import { useSelector, useDispatch } from "react-redux"
import { extractResultsSlice, setResults } from "../../core/datasource/localDataSource/results/resultsSlice"
import { useEffect } from "react"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { resultsDatasource } from "../../core/datasource/remoteDataSource/results"

const useLogic = () => {
  const { results } = useSelector(extractResultsSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    getBootcampResults()
  }, [currentBootcamp])
  useEffect(() => {
    console.log(results)
  }, [results])
  const getBootcampResults = async () => {
    try {
      const response = await resultsDatasource.getBootcampResults({ bootcampId: currentBootcamp.id })
      dispatch(setResults(response))
    } catch (error) {
      console.log(error)
    }
  }
  return { results }
}
export default useLogic
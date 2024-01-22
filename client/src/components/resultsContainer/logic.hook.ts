import { useSelector } from "react-redux"
import { extractResultsSlice } from "../../core/datasource/localDataSource/results/resultsSlice"
import { extractCurriculumsSlice } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useState } from "react"

const useLogic = () => {
  const { results } = useSelector(extractResultsSlice)
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const [currentWeek, setCurrentWeek] = useState<number>(currentBootcamp.weeks[0].ID)
  return { results, curriculums, currentBootcamp, currentWeek }
}
export default useLogic
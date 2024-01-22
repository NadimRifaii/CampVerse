import { useSelector } from "react-redux"
import { extractResultsSlice } from "../../core/datasource/localDataSource/results/resultsSlice"
import { extractCurriculumsSlice } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"
import { extractcurrentBootcampSlice } from "../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"

const useLogic = () => {
  const { results } = useSelector(extractResultsSlice)
  const { curriculums } = useSelector(extractCurriculumsSlice)
  const {currentBootcamp}=useSelector(extractcurrentBootcampSlice)
  return { results, curriculums ,currentBootcamp}
}
export default useLogic
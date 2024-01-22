import { useSelector } from "react-redux"
import { extractResultsSlice } from "../../core/datasource/localDataSource/results/resultsSlice"
import { extractCurriculumsSlice } from "../../core/datasource/localDataSource/curriculums/curriculumsSlice"

const useLogic = () => {
  const { results } = useSelector(extractResultsSlice)
  const { curriculums } = useSelector(extractCurriculumsSlice)
  return { results, curriculums }
}
export default useLogic
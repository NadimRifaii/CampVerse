import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { extractBootcampsSlice, setBootcamps } from "../../core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { bootcampsDataSource } from "../../core/datasource/remoteDataSource/bootcamps"
const useLogic = () => {
  const bootcamps = useSelector(extractBootcampsSlice)
  console.log(bootcamps)
  const dispatch = useDispatch()
  useEffect(() => {
    async function getBootcamps() {
      try {
        const response = await bootcampsDataSource.getUserBootcamps({})
        console.log(response)
        for (let i = 0; i < response.bootcamps.length; i++) {
          if (response.bootcamps[i].students == null)
            response.bootcamps[i].students = []
          if (response.bootcamps[i].mentors == null)
            response.bootcamps[i].mentors = []
        }
        dispatch(setBootcamps(response))
      } catch (error) {
        console.log(error)
      }
    }
    getBootcamps()
  }, [])
  return { bootcamps }
}
export default useLogic
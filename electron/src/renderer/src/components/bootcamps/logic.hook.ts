import { extractBootcampsSlice } from "@renderer/core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { setBootcamps } from "@renderer/core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { useSelector, useDispatch } from "react-redux"
import { bootcampsDataSource } from "@renderer/core/datasource/remoteDataSource/bootcamps"
import { useEffect } from "react"
const useLogic = () => {
  const { bootcamps } = useSelector(extractBootcampsSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    async function getBootcamps() {
      try {
        const response = await bootcampsDataSource.getBootcamps({})
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
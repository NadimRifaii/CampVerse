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
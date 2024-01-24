import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { BootcampsSliceType, extractBootcampsSlice, setBootcamps } from "../../core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { bootcampsDataSource } from "../../core/datasource/remoteDataSource/bootcamps"
import toast from "react-hot-toast"
const useLogic = () => {
  const { bootcamps }: BootcampsSliceType = useSelector(extractBootcampsSlice)
  useEffect(() => {
    console.log(bootcamps)
  }, [bootcamps])
  const dispatch = useDispatch()
  const getBootcamps = async () => {
    const loadingToastId = toast.loading('Getting bootcamps...');
    try {
      const response = await bootcampsDataSource.getUserBootcamps({})
      for (let i = 0; i < response.bootcamps.length; i++) {
        if (response.bootcamps[i].students == null)
          response.bootcamps[i].students = []
        if (response.bootcamps[i].mentors == null)
          response.bootcamps[i].mentors = []
      }
      dispatch(setBootcamps(response))
      toast.success('User bootcamps fetched successfully', { id: loadingToastId });
    } catch (error) {
      toast.error(`You're not in any bootcamp`, { id: loadingToastId });
    }
  }
  useEffect(() => {
    getBootcamps()
  }, [])
  return { bootcamps, getBootcamps }
}
export default useLogic
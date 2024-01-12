import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { extractScheduleSlice, setSchedule } from "@renderer/core/datasource/localDataSource/schedule/scheduleSlice"
import { scheduleDataSource } from "@renderer/core/datasource/remoteDataSource/schedule"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useLogic = () => {
  const { currentBootcamp } = useSelector(extractcurrentBootcampSlice)
  const { schedule } = useSelector(extractScheduleSlice)
  const dispatch = useDispatch()
  const fetchSchedule = async () => {
    try {
      const response = await scheduleDataSource.getSchedule({
        bootcamp_id: currentBootcamp.id
      })
      dispatch(setSchedule(response))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchSchedule()
  }, [])
  return { currentBootcamp, schedule }
}
export default useLogic
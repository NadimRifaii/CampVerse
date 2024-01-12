import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { extractScheduleSlice } from "@renderer/core/datasource/localDataSource/schedule/scheduleSlice"
import { scheduleDataSource } from "@renderer/core/datasource/remoteDataSource/schedule"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const useLogic = () => {
  const currentBootcamp = useSelector(extractcurrentBootcampSlice)
  const schedule = useSelector(extractScheduleSlice)
  const fetchSchedule = async () => {
    try {
      const response = await scheduleDataSource.getSchedule({
        bootcampId: currentBootcamp.id
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchSchedule()
  })
}
export default useLogic
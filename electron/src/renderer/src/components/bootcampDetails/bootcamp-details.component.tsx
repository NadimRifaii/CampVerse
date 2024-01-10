import { useSelector } from "react-redux"
import { extractcurrentBootcampSlice } from "@renderer/core/datasource/localDataSource/currentBootcamp/currentBootcampSlice"
import { useEffect } from "react"
const BootcampDetails = () => {
  const currentBootcamp = useSelector(extractcurrentBootcampSlice)
  useEffect(() => {
    console.log(currentBootcamp)
  }, [currentBootcamp])
  return (
    <h1>Bootcamp detail</h1>
  )
}
export default BootcampDetails
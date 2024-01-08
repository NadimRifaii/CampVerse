import { extractBootcampsSlice } from "@renderer/core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { setBootcamps } from "@renderer/core/datasource/localDataSource/bootcamps/bootcampsSlice"
import { useSelector, useDispatch } from "react-redux"
import { bootcampsDataSource } from "@renderer/core/datasource/remoteDataSource/bootcamps"
import { useEffect } from "react"
import Bootcamp from "../bootcamp/bootcamp.component"
import './bootcamps.styles.css'
const Bootcamps = () => {
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
  return (
    <div className="bootcamps-container">
      {
        bootcamps?.map(bootcamp => <Bootcamp key={bootcamp.ID} name={bootcamp.name} />)
      }
    </div>
  )
}
export default Bootcamps
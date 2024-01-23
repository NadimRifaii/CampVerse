import BootcampsEmptyState from "../../assets/BootcampsEmptyState4"
import BootcampC from "../bootcamp/bootcamp.component"
import './bootcamps.styles.css'
import useLogic from "./logic.hook"
const Bootcamps = () => {
  const { bootcamps } = useLogic()

  return (
    <div className="bootcamps-container">
      {
        !bootcamps.length ? <BootcampsEmptyState /> :
          bootcamps?.map(bootcamp => <BootcampC key={bootcamp.id} bootcamp={bootcamp} />)
      }
    </div>
  )
}
export default Bootcamps
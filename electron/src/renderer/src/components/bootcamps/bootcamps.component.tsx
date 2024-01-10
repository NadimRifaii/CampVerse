
import BootcampC from "../bootcamp/bootcamp.component"
import './bootcamps.styles.css'
import useLogic from "./logic.hook"
const Bootcamps = () => {
  const { bootcamps } = useLogic()
  return (
    <div className="bootcamps-container">
      {
        bootcamps?.map(bootcamp => <BootcampC key={bootcamp.ID} bootcamp={bootcamp} />)
      }
    </div>
  )
}
export default Bootcamps

import Bootcamp from "../bootcamp/bootcamp.component"
import './bootcamps.styles.css'
import useLogic from "./logic.hook"
const Bootcamps = () => {
  const { bootcamps } = useLogic()
  return (
    <div className="bootcamps-container">
      {
        bootcamps?.map(bootcamp => <Bootcamp key={bootcamp.ID} name={bootcamp.name} />)
      }
    </div>
  )
}
export default Bootcamps
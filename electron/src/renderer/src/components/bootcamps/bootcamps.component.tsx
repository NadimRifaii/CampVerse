import BootcampsEmptyState from "@renderer/assets/BootcampsEmptyState"
import BootcampC from "../bootcamp/bootcamp.component"
import './bootcamps.styles.css'
import useLogic from "./logic.hook"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ActiveSidebarItemContext } from "@renderer/utils/contexts/active-sidebar-item.context"
const Bootcamps = () => {
  const { bootcamps } = useLogic()
  const navigate = useNavigate()
  const { setActiveItem } = useContext(ActiveSidebarItemContext)
  return (
    <div className="bootcamps-container">
      {
        !bootcamps?.length ? <BootcampsEmptyState handleClick={() => {
          navigate('/dashboard/Create')
          setActiveItem('Create a bootcamp')
        }} /> :
          bootcamps?.map(bootcamp => <BootcampC key={bootcamp.id} bootcamp={bootcamp} />)
      }
    </div>
  )
}
export default Bootcamps
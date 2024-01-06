import { useState } from "react"
import AssignmentsIcon from "../../assets/assignments-icon.component"
import UsersIcon from "../../assets/users-icon.component"
import ResultsIcon from "../../assets/results-icon.component"
import ScheduleIcon from "../../assets/schedule-icon.component"
import VotesIcon from "../../assets/votes-icon.component"
import HomeIcon from "../../assets/home-icon.component"
import EditIcon from "../../assets/edit-icon.component"
import AddUser from "../../assets/add-user-icon.component"
import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useNavigate } from "react-router-dom"
type ItemType = {
  text: string;
  icon: () => JSX.Element;
}
type ItemsType = ItemType[]
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<string>("Bootcamps")
  const navigate = useNavigate()
  const adminItems: ItemsType = [
    {
      text: "Bootcamps",
      icon: HomeIcon
    },
    {
      text: "Create a bootcamp",
      icon: EditIcon
    },
    {
      text: "Users",
      icon: UsersIcon
    },
    {
      text: "Add user",
      icon: AddUser
    }
  ]

  const toggleActiveItem = (item: ItemType) => {
    setActiveItem(item.text)
    navigate(`${item.text.split(' ')[0]}`)
  }
  return { sidebarHidden, setSidebarHidden, adminItems, activeItem, toggleActiveItem }
}
export default useLogic
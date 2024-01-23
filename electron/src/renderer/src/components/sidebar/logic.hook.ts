import { useContext, useState } from "react"
import UsersIcon from "../../assets/users-icon.component"

import HomeIcon from "../../assets/home-icon.component"
import EditIcon from "../../assets/edit-icon.component"
import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useNavigate } from "react-router-dom"
import { local } from "@renderer/core/helpers/localStorage"
import { ActiveSidebarItemContext } from "@renderer/utils/contexts/active-sidebar-item.context"
type ItemType = {
  text: string;
  icon: () => JSX.Element;
}
type ItemsType = ItemType[]
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false)
  const { activeItem, setActiveItem } = useContext(ActiveSidebarItemContext)
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
    }
  ]

  const toggleActiveItem = (item: ItemType) => {
    setActiveItem(item.text)
    navigate(`${item.text.split(' ')[0]}`)
    local("activeItem", item.text)
  }
  return { sidebarHidden, setSidebarHidden, adminItems, activeItem, toggleActiveItem }
}
export default useLogic
import { useEffect, useState } from "react"
import AssignmentsIcon from "../../assets/assignments-icon.component"
import UsersIcon from "../../assets/users-icon.component"
import ResultsIcon from "../../assets/results-icon.component"
import ScheduleIcon from "../../assets/schedule-icon.component"
import VotesIcon from "../../assets/votes-icon.component"
import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useNavigate } from "react-router-dom"
import HomeIcon from "../../assets/home-icon.component"
import { local } from "../../core/helpers/localStorage"
type ItemType = {
  text: string;
  icon: () => JSX.Element;
}
type ItemsType = ItemType[]
const useLogic = (homepage: boolean) => {
  const user = useSelector(extractUserSlice)
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(true)
  const [activeItem, setActiveItem] = useState<string>(`${local("activeItem") ? local("activeItem") : "Assignments"}`)
  const navigate = useNavigate()

  const studentItems: ItemsType = [
    {
      text: "Assignments",
      icon: AssignmentsIcon,
    },
    {
      text: "Users",
      icon: UsersIcon
    },
    {
      text: "Results",
      icon: ResultsIcon
    },
    {
      text: "schedule",
      icon: ScheduleIcon
    }
  ]
  const homepageItems: ItemsType = [{
    text: "Bootcamps",
    icon: HomeIcon
  }]
  const mentorItems: ItemsType = [
    {
      text: "Assignments",
      icon: AssignmentsIcon
    },
    {
      text: "Users",
      icon: UsersIcon
    },
    {
      text: "Results",
      icon: ResultsIcon
    },
    {
      text: "Schedule",
      icon: ScheduleIcon
    }
  ]
  let items: ItemsType = []
  if (homepage) {
    items = homepageItems
  } else {
    switch (user.role) {
      case "student":
        items = studentItems
        break
      case "mentor":
        items = mentorItems
        break;
    }
  }
  const toggleActiveItem = (item: ItemType) => {
    setActiveItem(item.text)
    if (item.text == "Bootcamps") {
    } else
      navigate(`${item.text}`)
    local("activeItem", item.text)
  }
  return { sidebarHidden, setSidebarHidden, items, activeItem, toggleActiveItem }
}
export default useLogic
import { useState } from "react"
import AssignmentsIcon from "../../assets/assignments-icon.component"
import UsersIcon from "../../assets/users-icon.component"
import ResultsIcon from "../../assets/results-icon.component"
import ScheduleIcon from "../../assets/schedule-icon.component"
import VotesIcon from "../../assets/votes-icon.component"
import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useNavigate } from "react-router-dom"
import HomeIcon from "../../assets/home-icon.component"
type ItemType = {
  text: string;
  icon: () => JSX.Element;
}
type ItemsType = ItemType[]
const useLogic = (homepage: boolean) => {
  const user = useSelector(extractUserSlice)
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<string>("Assignments")
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
    console.log(homepage)
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
      console.log("alsjdf;lkasdjf")
    } else
      navigate(`${item.text}`)
  }
  return { sidebarHidden, setSidebarHidden, items, activeItem, toggleActiveItem }
}
export default useLogic
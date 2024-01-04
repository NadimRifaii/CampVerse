import { useState } from "react"
import AssignmentsIcon from "../../assets/assignments-icon.component"
import UsersIcon from "../../assets/users-icon.component"
import ResultsIcon from "../../assets/results-icon.component"
import ScheduleIcon from "../../assets/schedule-icon.component"
import VotesIcon from "../../assets/votes-icon.component"
import { useSelector } from "react-redux"
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
type ItemsType = {
  text: string;
  icon: () => JSX.Element;
}[]
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [sidebarActive, setSidebarActive] = useState<boolean>(true)
  const studentItems: ItemsType = [
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
      text: "Votes",
      icon: VotesIcon
    },
    {
      text: "Schedule",
      icon: ScheduleIcon
    }
  ]
  let items: ItemsType = []
  switch (user.role) {
    case "student":
      items = studentItems
      break
    case "mentor":
      items = mentorItems
      break;
  }
  return { sidebarActive, setSidebarActive, items }
}
export default useLogic
import Logo from "../../assets/logo.component"
import SidebarToggler from "../../assets/sidebar-toggler-icon"
import SmallLogo from "../../assets/small-logo.component"
import ResultsIcon from "../../assets/users-icon.component"
import useLogic from "./logic.hook"
import './sidebar.styles.css'
export const SideBar = () => {
  const { sidebarActive, setSidebarActive } = useLogic()
  return (
    <div className={`sidebar ${sidebarActive ? 'hidden' : ""} `}>
      <div className="top">
        <div className="logo-title">
          <div className="logo">
            <SmallLogo />
          </div>
          <div className="title">
            CampVerse
          </div>
        </div>
        <div className="toggler" onClick={() => setSidebarActive(!sidebarActive)}>
          <SidebarToggler />
        </div>
      </div>
      <div className="sidebar-items-container">
        <div className="sidebar-item">
          <div className="icon">
            <ResultsIcon />
          </div>
          <div className="text">
            Results
          </div>
        </div>
      </div>
    </div>
  )
}
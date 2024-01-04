import Logo from "../../assets/logo.component"
import SidebarToggler from "../../assets/sidebar-toggler-icon"
import SmallLogo from "../../assets/small-logo.component"
import './sidebar.styles.css'
export const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo-title">
          <div className="logo">
            <SmallLogo />
          </div>
          <div className="title">
            CampVerse
          </div>
        </div>
        <div className="toggler">
          <SidebarToggler />
        </div>
      </div>
    </div>
  )
}
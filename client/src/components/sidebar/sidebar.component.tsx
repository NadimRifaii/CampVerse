import SidebarToggler from "../../assets/sidebar-toggler-icon"
import SmallLogo from "../../assets/small-logo.component"
import SidebarItem from "../sidebarItem/sidebar-item.component"
import useLogic from "./logic.hook"
import './sidebar.styles.css'
export const SideBar = ({ homepage = false }) => {
  const { sidebarHidden, setSidebarHidden, items, activeItem, toggleActiveItem } = useLogic(homepage)
  return (
    <div className={`sidebar ${sidebarHidden ? 'hidden' : ""} `}>
      <div className="top">
        <div className="logo-title">
          <div className="logo">
            <SmallLogo />
          </div>
          <div className="title">
            CampVerse
          </div>
        </div>
        <div className="toggler" onClick={() => setSidebarHidden(!sidebarHidden)}>
          <SidebarToggler />
        </div>
      </div>
      <div className="sidebar-items-container">
        {
          items.map(item => <SidebarItem
            handleClick={() => toggleActiveItem(item)}
            isActive={activeItem === item.text}
            key={item.text} icon={item.icon()}
            text={item.text} />)
        }
      </div>
    </div>
  )
}
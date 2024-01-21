import { useEffect, useState } from "react"
import SidebarToggler from "../../assets/sidebar-toggler-icon"
import SmallLogo from "../../assets/small-logo.component"
import SidebarItem from "../sidebarItem/sidebar-item.component"
import useLogic from "./logic.hook"
import './sidebar.styles.css'
export const SideBar = () => {
  const { sidebarHidden, setSidebarHidden, adminItems: items, activeItem, toggleActiveItem } = useLogic()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {

      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (screenWidth < 767) {
      setSidebarHidden(true);
    }
  }, [screenWidth]);
  const handleToggleClick = () => {
    if (screenWidth >= 767) {
      setSidebarHidden(!sidebarHidden);
    }
  };
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
        <div className="toggler" onClick={handleToggleClick}>
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
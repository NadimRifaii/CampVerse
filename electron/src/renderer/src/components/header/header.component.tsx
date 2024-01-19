import './header.styles.css'
import BellIcon from '../../assets/bell-icon.component.jsx'
import ArrowUp from '../../assets/arrow-up.component.jsx'
import ArrowDown from '../../assets/arrow-down.component.jsx'
import Dropdown from '../dropdown/dropdown.component'
import Notifications from '../notifications/notifications.component.jsx'
import { useContext, useEffect, useState } from 'react'
import { ActiveEditContext } from '@renderer/utils/contexts/active-edit-profile.context'
import useLogic from './logic.hook'
const Header = () => {
  const { user, dropdownActive, setDropdownActive, notifications } = useLogic()
  const activeEditContext = useContext(ActiveEditContext)
  const [activeNotification, setActiveNotification] = useState(false)
  const { active } = activeEditContext || {};

  useEffect(() => {
    if (active)
      setDropdownActive(false)
  }, [active])
  return (
    <div className="header">
      <h1>x</h1>
      <div className="profile-notification-container">
        <div className="notification" onClick={() => setActiveNotification(!activeNotification)} >
          <BellIcon />
          <span>{notifications.length}</span>
        </div>
        {/* {
          activeNotification ? <Notifications /> : ''
        } */}
        <Notifications setActiveNotification={setActiveNotification} className={activeNotification ? 'active' : ''} />
        <div className={`profile ${dropdownActive ? 'active' : ""} `}>
          <div className="image">
            <img src={`http://localhost:8000/images/${user.profilePicture}`} alt="" />
          </div>
          <div className="name-role">
            <div className="name">
              {user.username}
            </div>
            <div className="role">
              {user.role}
            </div>
          </div>
          <div className="arrow-up-down" onClick={() => setDropdownActive(!dropdownActive)} >
            {dropdownActive ? <ArrowUp /> : <ArrowDown />}
          </div>
        </div>
        <Dropdown />
      </div>
    </div>
  )
}
export default Header
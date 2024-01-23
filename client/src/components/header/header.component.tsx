import './header.styles.css'

import useLogic from './logic.hook'
import ArrowUp from '../../assets/arrow-up.component'
import ArrowDown from '../../assets/arrow-down.component'
import Dropdown from '../dropdown/dropdown.component'
import { ActiveEditContext } from '../../utils/contexts/active-edit-profile.context'
import Notifications from '../../components/notifications/notifications.component'
import { useContext, useEffect, useState } from 'react'
import BellIcon from '../../assets/bell-icon.component'
const Header = () => {
  const { user, dropdownActive, setDropdownActive, notifications } = useLogic()
  const [activeNotification, setActiveNotification] = useState(false)
  const activeEditContext = useContext(ActiveEditContext)

  const { active, setActive } = activeEditContext || {};

  useEffect(() => {
    if (active)
      setDropdownActive(false)
  }, [active])
  return (
    <div className="header">

      <h1></h1>
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
            <img src={`${process.env.REACT_APP_SERVER_GO}/images/${user.profilePicture}`} alt="" />
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
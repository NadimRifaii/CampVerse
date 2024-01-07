import './header.styles.css'
import BellIcon from '../../assets/bell-icon.component.jsx'
import useLogic from './logic.hook'
import ArrowUp from '../../assets/arrow-up.component.jsx'
import ArrowDown from '../../assets/arrow-down.component.jsx'
import Dropdown from '../dropdown/dropdown.component'
import { ActiveEditContext } from '../../utils/contexts/active-edit-profile.context'
import { useContext, useEffect } from 'react'
const Header = () => {
  const { user, dropdownActive, setDropdownActive } = useLogic()
  const activeEditContext = useContext(ActiveEditContext)

  const { active, setActive } = activeEditContext || {};

  useEffect(() => {
    if (active)
      setDropdownActive(false)
  }, [active])
  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="profile-notification-container">
        <div className="notification">
          <BellIcon />
        </div>
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
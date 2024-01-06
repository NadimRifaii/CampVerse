import './header.styles.css'
import BellIcon from '../../assets/bell-icon.component.jsx'
import useLogic from './logic.hook'
import ArrowUp from '../../assets/arrow-up.component.jsx'
import ArrowDown from '../../assets/arrow-down.component.jsx'
const Header = () => {
  const { user, dropdownActive, setDropdownActive } = useLogic()
  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="profile-notification-container">
        <div className="notification">
          <BellIcon />
        </div>
        <div className="profile">
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
      </div>
    </div>
  )
}
export default Header
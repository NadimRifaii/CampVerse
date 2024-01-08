import { Link } from 'react-router-dom'
import './dropdown.styles.css'
import { useContext } from 'react'
import { ActiveEditContext } from '@renderer/utils/contexts/active-edit-profile.context'
import { local } from '@renderer/core/helpers/localStorage'
const Dropdown = () => {
  const activeEditContext = useContext(ActiveEditContext)
  const { active, setActive } = activeEditContext || {};
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Link to={'/dashboard'} onClick={() => {
            if (setActive)
              setActive(!active)
          }}>Edit profile</Link>
        </li>
        <li>
          <Link to='/' onClick={() => local('token', "xxxx")}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown

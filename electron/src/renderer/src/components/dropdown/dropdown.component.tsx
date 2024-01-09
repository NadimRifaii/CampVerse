import { Link } from 'react-router-dom'
import './dropdown.styles.css'
import { useContext } from 'react'
import { ActiveEditContext } from '@renderer/utils/contexts/active-edit-profile.context'
import { local } from '@renderer/core/helpers/localStorage'
import { Button } from '../common/button/button.component'
import { CurrentUserContext } from '@renderer/utils/contexts/current-user.context'
import { extractUserSlice } from '@renderer/core/datasource/localDataSource/user/userSlice'
import { useSelector } from 'react-redux'
const Dropdown = () => {
  const activeEditContext = useContext(ActiveEditContext)
  const { active, setActive } = activeEditContext || {};
  const user=useSelector(extractUserSlice)
  const currentUserContext=useContext(CurrentUserContext)
  const {setCurrentUser}=currentUserContext || {}
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Button text="Edit profile" handleClick={() => {
            if (setActive) {
              setActive(!active)
              setCurrentUser(user)
            }
          }} />
        </li>
        <li>
          <Link to='/' onClick={() => local('token', "xxxx")}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown

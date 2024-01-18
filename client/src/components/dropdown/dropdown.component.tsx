import { Link } from 'react-router-dom'
import './dropdown.styles.css'
import { local } from '../../core/helpers/localStorage'
import { useContext } from 'react'
import { ActiveEditContext } from '../../utils/contexts/active-edit-profile.context'
import { useDispatch, useSelector } from 'react-redux'
import { removeBootcamps } from '../../core/datasource/localDataSource/bootcamps/bootcampsSlice'
import { removeCurrentBootcamp } from '../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice'
import { CurrentUserContext } from '../../utils/contexts/current-user.context'
import { extractUserSlice } from '../../core/datasource/localDataSource/user/userSlice'
const Dropdown = () => {
  const activeEditContext = useContext(ActiveEditContext)
  const user = useSelector(extractUserSlice)
  const dispatch = useDispatch()
  const { active, setActive } = activeEditContext || {};
  const currentUserContext = useContext(CurrentUserContext)
  const { setCurrentUser } = currentUserContext
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Link to={'/dashboard'} onClick={() => {
            if (setActive) {
              setCurrentUser(user)
              setActive(!active)
            }
          }}>Edit profile</Link>
        </li>
        <li>
          <Link to='/' onClick={() => {
            local('token', "xxxx")
            dispatch(removeBootcamps([]))
            dispatch(removeCurrentBootcamp({}))
          }}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown

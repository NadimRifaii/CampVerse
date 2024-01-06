import { Link } from 'react-router-dom'
import './dropdown.styles.css'
import { local } from '@renderer/core/helpers/localStorage'
const Dropdown = () => {
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Link to={'/edit_profile'} >Edit profile</Link>
        </li>
        <li>
          <Link to='/' onClick={() => local('token', "xxxx")} >Logout</Link>
        </li>
      </ul>
    </div>
  )
}
export default Dropdown
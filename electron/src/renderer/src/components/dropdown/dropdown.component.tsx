import { Link } from 'react-router-dom'
import './dropdown.styles.css'
const Dropdown = () => {
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Link to={'/edit_profile'} >Edit profile</Link>
        </li>
        <li>
          <Link to='/'>Logout</Link>
        </li>
      </ul>
    </div>
  )
}
export default Dropdown
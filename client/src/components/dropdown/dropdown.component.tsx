import { Link } from 'react-router-dom'
import './dropdown.styles.css'

import { Button } from '../common/button/button.component'
import useLogic from './logic.hook'
const Dropdown = () => {
  const { user, active, setActive, reset, setCurrentUser } = useLogic()
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Button text='Edit profile' handleClick={() => {
            setCurrentUser(user)
            setActive(!active)
          }} />
        </li>
        <li>
          <Link to='/' onClick={reset}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown

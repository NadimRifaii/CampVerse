import { Button } from '../common/button/button.component'
import { useContext } from 'react'
import './user-row.styles.css'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../utils/contexts/current-user.context'
import { User } from '../../core/types/user'
type UserRowProps = {
  info: User,
  activeBootcamp?: string | boolean
  showBtn: string
}
const UserRow = ({ info, showBtn }: UserRowProps) => {
  const { setCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()
  return (
    <div className="user-row">
      <div className="left">
        <div className="profile-picture">
          <img src={`${process.env.REACT_APP_SERVER_GO}/images/${info.profilePicture}`} alt="" />
        </div>
        <div className="role-name">
          <div className="name">
            {info.firstname} {info.lastname}
          </div>
          <div className="role">
            {info.role}
          </div>
        </div>
      </div>
      <div className="buttons-container">
        {
          showBtn == "Add" ?
            <Button text='Add' handleClick={() => {
              setCurrentUser(info)
            }} />
            : <Button text='Chat' handleClick={() => {
              setCurrentUser(info)
              navigate('/dashboard/chat')
            }} />
        }
      </div>
    </div>
  )
}
export default UserRow
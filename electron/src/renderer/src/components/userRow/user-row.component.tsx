import { Button } from '../common/button/button.component'
import { useContext } from 'react'
import { ActiveEditContext } from '@renderer/utils/contexts/active-edit-profile.context'
import { CurrentUserContext } from '@renderer/utils/contexts/current-user.context'
import './user-row.styles.css'
import { User } from '@renderer/core/types/user'
type UserRowProps = {
  info: User
}
const UserRow = ({ info }: UserRowProps) => {
  const activeEditContext = useContext(ActiveEditContext)
  const currentUserContext = useContext(CurrentUserContext)
  const { active, setActive } = activeEditContext || {};
  const { setCurrentUser } = currentUserContext || {}
  return (
    <div className="user-row">
      <div className="left">
        <div className="profile-picture">
          <img src={`http://localhost:8000/images/${info.profilePicture}`} alt="" />
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
        <Button text='Edit' handleClick={() => {
          if (setActive) {
            setCurrentUser(info)
            setActive(!active)
          }
        }} />
        <Button text='Chat' />
      </div>
    </div>
  )
}
export default UserRow
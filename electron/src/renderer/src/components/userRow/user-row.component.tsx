import { Button } from '../common/button/button.component'
import { useContext } from 'react'
import { ActiveEditContext } from '@renderer/utils/contexts/active-edit-profile.context'
import { CurrentUserContext } from '@renderer/utils/contexts/current-user.context'
import './user-row.styles.css'
import { User } from '@renderer/core/types/user'
import { useNavigate } from 'react-router-dom'
type UserRowProps = {
  info: User,
  activeBootcamp?: string | boolean
  setActiveBootcamp?: React.Dispatch<React.SetStateAction<string | boolean>>
  showBtn: string
}
const UserRow = ({ info, showBtn, setActiveBootcamp, activeBootcamp }: UserRowProps) => {
  const activeEditContext = useContext(ActiveEditContext)
  const currentUserContext = useContext(CurrentUserContext)
  const navigate = useNavigate()
  const { setCurrentUser } = currentUserContext || {};
  const { active, setActive } = activeEditContext || {};
  return (
    <div className="user-row">
      <div className="left">
        <div className="profile-picture">
          <img src={`http://ec2-35-180-140-53.eu-west-3.compute.amazonaws.com:80/images/${info.profilePicture}`} alt="" />
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
        {
          showBtn == "Add" ?
            <Button text='Add' handleClick={() => {
              if (setActiveBootcamp) {
                setCurrentUser(info)
                setActiveBootcamp(true)
              }
            }} />
            : <Button text='Chat' handleClick={() => {
              setCurrentUser(info)
              navigate("/dashboard/chat")
            }} />
        }
      </div>
    </div>
  )
}
export default UserRow
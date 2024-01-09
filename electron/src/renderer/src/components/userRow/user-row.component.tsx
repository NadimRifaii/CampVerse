import { Button } from '../common/button/button.component'
import { useContext } from 'react'
import { ActiveEditContext } from '@renderer/utils/contexts/active-edit-profile.context'
import './user-row.styles.css'
import EditProfile from '../editProfile/edit.component'
type UserRowProps = {
  info: {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    profilePicture: string,
    role: "mentor" | "student" | "user"
  }
}
const UserRow = ({ info }: UserRowProps) => {
  const activeEditContext = useContext(ActiveEditContext)
  const { active, setActive } = activeEditContext || {};
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
            setActive(!active)
            console.log(info)
          }
        }} />
        <Button text='Chat' />
      </div>
      {/* {
        active ? <EditProfile user={info} /> : ""
      } */}
    </div>
  )
}
export default UserRow
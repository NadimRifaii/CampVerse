import { Button } from '../common/button/button.component'
import './user-row.styles.css'
type UserRowProps = {
  info: {
    firstname: string,
    lastname: string,
    profilePicture: string,
    role: string
  }
}
const UserRow = ({ info }: UserRowProps) => {
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
        <Button text='Edit' />
        <Button text='Chat' />
      </div>
    </div>
  )
}
export default UserRow
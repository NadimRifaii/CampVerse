import { useEffect } from 'react'
import useLogic from './logic.hook'
import './users.styles.css'
import UserRow from '../userRow/user-row.component'
type UsersProps = {
  userType?: "user" | "student" | "mentor"
}
const Users = ({ userType = "user" }: UsersProps) => {
  const { fetchUsers, users } = useLogic()
  useEffect(() => {
    fetchUsers(userType)
  }, [])
  return (
    <div className="users-container">
      <div className="search-bar">
        <input type="search" placeholder="Search..." />
        <img src={`http://localhost:8000/images/search.png`} alt="" />
      </div>
      {
        users?.map(user => {
          const { firstname, lastname, profilePicture, UserRole: { role } } = user
          if (role != 'admin')
            return <UserRow key={user.ID} info={{ firstname, lastname, profilePicture, role }} />
          return null
        })
      }
    </div>
  )
}
export default Users
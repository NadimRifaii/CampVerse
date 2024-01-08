import { useEffect } from 'react'
import useLogic from './logic.hook'
import './users.styles.css'
import UserRow from '../userRow/user-row.component'
type UsersProps = {
  userType?: "user" | "student" | "mentor"
}
const Users = ({ userType = "mentor" }: UsersProps) => {
  const { fetchUsers, filteredArray: users, searchUsers } = useLogic()
  useEffect(() => {
    fetchUsers(userType)
  }, [])
  return (
    <div className="users-container">
      <div className="search-bar">
        <input type="search" placeholder="Search by username..." onChange={(e) => searchUsers(e.target.value)} />
        <img src={`http://localhost:8000/images/search.png`} alt="" />
      </div>
      <div className="holder">
        {
          users?.length > 0 ? users?.map(user => {
            const { firstname, lastname, profilePicture, UserRole: { role } } = user
            if (role != 'admin')
              return <UserRow key={user.ID} info={{ firstname, lastname, profilePicture, role }} />
            return null
          })
            : <h1>No such user</h1>
        }
      </div>

    </div>
  )
}
export default Users
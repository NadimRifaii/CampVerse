import { useEffect } from 'react'
import useLogic from './logic.hook'
import './users.styles.css'
import UserRow from '../userRow/user-row.component'
type UsersProps = {
  userType?: "user" | "student" | "mentor"
}
const Users = ({ userType = "user" }: UsersProps) => {
  const { fetchUsers, filteredArray: users, searchUsers } = useLogic()
  useEffect(() => {
    console.log("Fetching users")
    fetchUsers(userType)
  }, [])
  return (
    <div className="users-container">
      <div className="search-bar-container">
        <div className="search-bar">
          <input type="search" placeholder="Search..." onChange={(e) => searchUsers(e.target.value)} />
          <img src={`http://localhost:8000/images/search.png`} alt="" />
        </div>
      </div>
      <div className="holder">
        {
          users?.length > 0 ? users?.map(user => {
            if (user.role != 'admin')
              return <UserRow key={user.id} info={user} />
            return null
          })
            : <h1>No such user</h1>
        }
      </div>
    </div>
  )
}
export default Users
import { useEffect } from 'react'
import useLogic from './logic.hook'
import './users.styles.css'
type UsersProps = {
  userType?: "user" | "student" | "mentor"
}
const Users = ({ userType = "user" }: UsersProps) => {
  const { fetchUsers } = useLogic()
  useEffect(() => {
    fetchUsers(userType)
  }, [])
  return (
    <div className="users-container">
      <div className="search-bar">
        <input type="search" placeholder="Search..." />
        <img src={`http://localhost:8000/images/search.png`} alt="" />
      </div>
    </div>
  )
}
export default Users
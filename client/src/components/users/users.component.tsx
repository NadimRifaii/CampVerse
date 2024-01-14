import { useContext, useEffect, useState } from 'react'
import useLogic from './logic.hook'
import './users.styles.css'
import UserRow from '../userRow/user-row.component'
import { Button } from '../common/button/button.component'
import { CurrentUserContext } from '../../utils/contexts/current-user.context'
type UsersProps = {
  userType?: "user" | "student" | "mentor",

  bootcampUsers?: [] | null
}
const Users = ({ userType = "user", bootcampUsers }: UsersProps) => {
  const { filteredArray: users, searchUsers, fetchUsers } = useLogic()
  const [activeBootcamp, setActiveBootcamp] = useState<boolean | string>(false)
  const currentUserContext = useContext(CurrentUserContext)
  const { currentUser, setCurrentUser } = currentUserContext;

  return (
    <div className="users-container">
      <div className="search-bar-container">
        <div className="search-bar">
          <input type="search" placeholder="Search..." onChange={(e) => searchUsers(e.target.value)} />
          <img src={`http://localhost:8000/images/black-search.png`} alt="" />
        </div>
      </div>
      <div className="holder">
        {
          users?.length > 0 ? users?.map(user => {
            if (user.role != 'admin')
              return <UserRow key={user.email} setActiveBootcamp={setActiveBootcamp} showBtn={"Chat"} info={user} />
            return null
          })
            : <h1>No such user</h1>
        }
      </div>
    </div >
  )
}
export default Users
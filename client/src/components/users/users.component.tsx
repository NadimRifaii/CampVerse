import { useContext, useEffect, useState } from 'react'
import useLogic from './logic.hook'
import './users.styles.css'
import UserRow from '../userRow/user-row.component'
import { Button } from '../common/button/button.component'
type UsersProps = {
  showBtn: string,
  showHeader: boolean
}
const Users = ({ showHeader, showBtn }: UsersProps) => {
  const { filteredArray: users, currentActiveComponent, setCurrentActiveComponent, searchUsers, } = useLogic()
  const [activeBootcamp, setActiveBootcamp] = useState<boolean | string>(false)
  return (
    <div className="users-section">
      {
        showHeader &&
        <div className="toggler-header">
          <Button text="Students" handleClick={() => setCurrentActiveComponent('student')} className={`${currentActiveComponent == "student" ? 'active' : ""}`} />
          <Button text="Mentors" handleClick={() => setCurrentActiveComponent('mentor')} className={`${currentActiveComponent == "mentor" ? 'active' : ""}`} />
        </div>
      }
      <div className="users-container">
        <div className="search-bar-container">
          <div className="search-bar">
            <input type="search" placeholder="Search..." onChange={(e) => searchUsers(e.target.value)} />
            <img src={`${process.env.REACT_APP_SERVER_GO}/images/black-search.png`} alt="" />
          </div>
        </div>
        <div className="holder">
          {
            users?.length > 0 ? users?.map(user => {
              return <UserRow key={user.email} showBtn={showBtn} info={user} />
            })
              : <h1>No such user</h1>
          }
        </div>
      </div >
    </div>
  )
}
export default Users
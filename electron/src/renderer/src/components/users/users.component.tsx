import { useContext, useEffect, useState } from 'react'
import useLogic from './logic.hook'
import './users.styles.css'
import UserRow from '../userRow/user-row.component'
import { Button } from '../common/button/button.component'
import { CurrentUserContext } from '@renderer/utils/contexts/current-user.context'
import { useNavigate } from 'react-router-dom'
import { User } from '@renderer/core/types/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
type UsersProps = {
  userType?: "student" | "mentor",
  showBtn: string,
  bootcampUsers?: [] | null,
  showHeader: boolean
}
const Users = ({ userType = "student", showBtn = "Add", bootcampUsers, showHeader }: UsersProps) => {
  const { filteredArray: users, bootcamps, currentActiveComponent, setCurrentActiveComponent, searchUsers, getBootcamps, addUserToBootcamp, fetchUsers, setBootcampUsers } = useLogic()
  const [activeBootcamp, setActiveBootcamp] = useState<boolean | string>(false)
  const currentUserContext = useContext(CurrentUserContext)
  const { currentUser, setCurrentUser } = currentUserContext;
  const navigate = useNavigate()
  useEffect(() => {
    if (bootcampUsers) {
      setBootcampUsers(bootcampUsers)
    } else {
      fetchUsers(currentActiveComponent)
    }
    getBootcamps()
  }, [currentActiveComponent, userType])
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
          <div className={`bootcamps-list ${activeBootcamp ? 'active' : ''}`}>
            {
              bootcamps?.length > 0 ?
                <h3>Choose a bootcamp</h3>
                : ''
            }
            <ul>
              {
                bootcamps?.length > 0 ?
                  bootcamps?.map(bootcamp => <li key={bootcamp.id} className={`${activeBootcamp == bootcamp.name ? 'active' : ""}`} onClick={(() => {
                    setActiveBootcamp(bootcamp.name)
                  })} ><span>{bootcamp.name}</span></li>)
                  : <span className='no-bootcamps' >You need to create a bootcamp first</span>
              }
            </ul>
            <div className="save-btn">
              <Button text='Save' handleClick={() => {
                if (bootcamps?.length > 0) {
                  addUserToBootcamp({
                    'email': currentUser?.email,
                    'bootcampName': activeBootcamp
                  })
                  setCurrentUser({} as User)
                }
                setActiveBootcamp(false)
              }} className={activeBootcamp ? 'active' : ""} />
            </div>
          </div>
          <div className="search-bar">
            <input type="search" placeholder="Search..." onChange={(e) => searchUsers(e.target.value)} />
            <img src={`http://localhost:8000/images/black-search.png`} alt="" />
          </div>
        </div>
        <div className="holder">
          {
            users?.length > 0 ? users?.map(user => {
              if (user.role != 'admin')
                return <UserRow key={user.email} setActiveBootcamp={setActiveBootcamp} showBtn={showBtn} info={user} />
              return null
            })
              : <>
                <h1>User not found</h1>
                <FontAwesomeIcon icon={faUserSlash} />
              </>
          }
        </div>
      </div >
    </div >
  )
}
export default Users
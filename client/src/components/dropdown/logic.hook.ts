import { local } from '../../core/helpers/localStorage'
import { useContext } from 'react'
import { ActiveEditContext } from '../../utils/contexts/active-edit-profile.context'
import { useDispatch, useSelector } from 'react-redux'
import { removeBootcamps } from '../../core/datasource/localDataSource/bootcamps/bootcampsSlice'
import { removeCurrentBootcamp } from '../../core/datasource/localDataSource/currentBootcamp/currentBootcampSlice'
import { CurrentUserContext } from '../../utils/contexts/current-user.context'
import { extractUserSlice, removeUser } from '../../core/datasource/localDataSource/user/userSlice'
import { ActiveSidebarItemContext } from '../../utils/contexts/active-sidebar-item.context'
const useLogic = () => {
  const activeEditContext = useContext(ActiveEditContext)
  const user = useSelector(extractUserSlice)
  const dispatch = useDispatch()
  const { active, setActive } = activeEditContext;
  const { setActiveItem } = useContext(ActiveSidebarItemContext)
  const currentUserContext = useContext(CurrentUserContext)
  const { setCurrentUser } = currentUserContext
  const reset = () => {
    local('token', "xxxx")
    dispatch(removeBootcamps([]))
    dispatch(removeCurrentBootcamp({}))
    dispatch(removeUser({}))
    local("activeItem", 'Assignments')
    setActiveItem('Assignments')
    local("currentBootcamp", "xxx")

  }
  return { user, active, reset, setActive, setCurrentUser }
}
export default useLogic
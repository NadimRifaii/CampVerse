import { useSelector } from 'react-redux'
import { useState, useContext, useEffect } from 'react'
import { extractUserSlice } from '../../core/datasource/localDataSource/user/userSlice'
import { NotificationsContext } from '../../utils/contexts/notifications.context'
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [dropdownActive, setDropdownActive] = useState<boolean>(false)
  const notificaitonsContext = useContext(NotificationsContext)
  const { notifications, setNotifications } = notificaitonsContext || {}
  useEffect(() => {
  }, [notifications])
  return { user, dropdownActive, setDropdownActive, notifications }
}
export default useLogic
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { extractUserSlice } from '../../core/datasource/localDataSource/user/userSlice'
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [dropdownActive, setDropdownActive] = useState<boolean>(false)
  return { user, dropdownActive, setDropdownActive }
}
export default useLogic
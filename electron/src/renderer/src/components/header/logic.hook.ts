import { extractUserSlice } from '@renderer/core/datasource/localDataSource/user/userSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const [dropdownActive, setDropdownActive] = useState<boolean>(false)
  return { user, dropdownActive, setDropdownActive }
}
export default useLogic
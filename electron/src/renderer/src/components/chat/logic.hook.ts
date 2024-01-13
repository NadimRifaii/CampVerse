import { messagesDataSource } from "@renderer/core/datasource/remoteDataSource/chat"
import { useEffect, useState } from "react"
import { extractUserSlice } from "@renderer/core/datasource/localDataSource/user/userSlice"
import { useSelector } from "react-redux"
import { useContext } from "react"
import { CurrentUserContext } from "@renderer/utils/contexts/current-user.context"
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const currentUserContext = useContext(CurrentUserContext)
  const { currentUser } = currentUserContext || {}
  const [chat, setChat] = useState([])
  const [loadingChat, setLoadingChat] = useState(false)
  const fetchUsers = async () => {
    console.log(currentUser)
    try {
      const data = await messagesDataSource.accessChat({
        email: currentUser?.email
      })
      setChat(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return { chat, user, currentUser }
}
export default useLogic
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
  const [messages, setMessages] = useState([])
  const [loadingChat, setLoadingChat] = useState('')
  const [content, setContent] = useState("")
  const fetchUsers = async () => {
    try {
      setLoadingChat('active')
      const data = await messagesDataSource.accessChat({
        email: currentUser?.email
      })
      setChat(data)
    } catch (error) {
      console.log("ERROR")
    }
  }
  const getChatMessages = async () => {
    console.log(chat)
    try {
      if (chat._id) {
        setLoadingChat('active')
        const data = await messagesDataSource.getChatMessages({ chatId: chat._id })
        setMessages(data)
        setLoadingChat('')
      }
    } catch (error) {
      console.log("error")
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  useEffect(() => {
    getChatMessages()
  }, [chat])
  return { chat, messages, user, currentUser, loadingChat }
}
export default useLogic
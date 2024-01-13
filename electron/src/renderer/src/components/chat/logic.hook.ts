import { messagesDataSource } from "@renderer/core/datasource/remoteDataSource/chat"
import { useEffect, useState } from "react"

const useLogic = () => {
  const [chats, setChats] = useState([])
  const fetchUsers = async () => {
    try {
      const data = await messagesDataSource.fetchMessages({})
      setChats(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return { chats }
}
export default useLogic
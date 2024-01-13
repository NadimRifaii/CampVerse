import { useEffect } from "react"
import useLogic from "./logic.hook"

const Chat = () => {
  const { chats } = useLogic()
  useEffect(() => {
    console.log(chats)
  }, [chats])
  return (
    <h1>Chat page</h1>
  )
}
export default Chat
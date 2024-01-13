import { useEffect } from "react"
import useLogic from "./logic.hook"
import { InputLabel } from '../common/inputLabel/input-label.component';
import './chat.styles.css'
const Chat = () => {
  const { chat, user, currentUser } = useLogic()
  useEffect(() => {
    console.log(chat)
  }, [chat])
  return (
    <div className="chat-page">
      <div className="header">
        <div className="user-profile">
          <img src={`http://localhost:8000/images/${currentUser.profilePicture}`} alt="" />
        </div>
        <div className="user-name">
          {currentUser.username}
        </div>
      </div>
      <div className="messages-container">

      </div>
      <div className="typing-input">
        <input type="text" placeholder="Enter your message" />
      </div>
    </div>
  )
}
export default Chat
import { useEffect } from "react"
import useLogic from "./logic.hook"
import Message from '../message/message.component'

import './chat.styles.css'
const Chat = () => {
  const { chat, user, messages, currentUser, loadingChat, typingHandler, sendMessage, content } = useLogic()
  return (
    <div className="chat-page">
      <div className="header">
        <div className="user-profile">
          <img src={`http://localhost:8000/images/default_profile_picture`} alt="" />
        </div>
        <div className="user-name">
          `admin`
        </div>
      </div>
      <div className="messages-container">
        <div className={`typing-bullets  `}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {messages?.map((message, index) => {
          return <Message key={index} content={message.content} className={`${message.sender.email == user.email ? 'sender' : ""}`} />
        })}
        <div className={`loading-spinner ${loadingChat} `}></div>

      </div>
      <div className="typing-input">
        <input type="text" onChange={typingHandler} onKeyDown={sendMessage} value={content} placeholder="Enter your message" />
      </div>
    </div>
  )
}
export default Chat
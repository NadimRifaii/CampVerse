import { useEffect } from "react"
import useLogic from "./logic.hook"
import Message from '../message/message.component'

import './chat.styles.css'
const Chat = () => {
  const { chat, user, messages, currentUser, loadingChat, content, messagesContainerRef, isTyping, typingHandler, sendMessage, } = useLogic()
  return (
    <div className="chat-page">
      <div className="header">
        <div className="user-profile">
          <img src={`${process.env.REACT_APP_SERVER_GO}/images/${currentUser.profilePicture}`} alt="" />
        </div>
        <div className="user-name">
          {currentUser.username}
        </div>
      </div>
      <div className="messages-container" ref={messagesContainerRef}>
        <div className={`typing-bullets ${isTyping ? 'typing' : ''} `}>
          typing
          <span></span>
          <span></span>
          <span></span>
        </div>
        {messages?.map((message, index) => {
          return <Message key={index} content={message.content} className={`${message.sender.email == user.email ? 'sender' : ""}`} />
        })}

        {
          loadingChat && <div className={`loading-spinner active `}></div>
        }
      </div>
      <div className="typing-input">
        <input type="text" onChange={typingHandler} onKeyDown={sendMessage} value={content} placeholder="Enter your message" />
      </div>
    </div>
  )
}
export default Chat
import './message.styles.css'
type MessagePropType = {
  content: string,
  className: string
}
const Message = ({ content, className }: MessagePropType) => {
  return (
    <div className={`message-container ${className} `}>
      <div className="message">
        <h1>{content}</h1>
      </div>
    </div>
  )
}
export default Message
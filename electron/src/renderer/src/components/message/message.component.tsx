import './message.styles.css'
type MessagePropType = {
  content: string,
  className: string
}
const Message = ({ content, className }: MessagePropType) => {
  return (
    <div className={`message-container ${className} `}>
      <div className="message">
        <p>{content}</p>
      </div>
    </div>
  )
}
export default Message
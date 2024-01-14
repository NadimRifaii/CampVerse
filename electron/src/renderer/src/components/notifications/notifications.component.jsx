import { useEffect } from "react";
import notificationsLogic from "./logic.hook";
import './notifications.styles.css'
const Notifications = ({className}) => {
  const { notifications } = notificationsLogic()
  useEffect(() => {
    console.log(notifications)
  }, [notifications])
  return (
    <div className={`notifications-container ${className} `}>
      {
        notifications?.map((notification, index) => {
          return (
            <div className="info" key={index} >
              <div className="sender"> {notification.sender.email.split("@")[0]} sent a message</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Notifications;
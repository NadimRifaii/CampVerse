import { useEffect } from "react";
import notificationsLogic from "./logic.hook";
import { useNavigate } from 'react-router-dom'
import './notifications.styles.css'
const Notifications = ({ className = "", setActiveNotification }) => {
  const { notifications, removeNotification, setCurrentUser } = notificationsLogic();
  const navigate = useNavigate();

  return (
    <div className={`notifications-container ${className}`}>
      {
        notifications.length == 0 ? <p>No new notifications</p> :
          notifications?.map((notification, index) => (
            <div className="info" key={index} onClick={() => {
              removeNotification(index);
              setCurrentUser(notification.sender);
              setActiveNotification(false);
              navigate("/dashboard/chat");
            }}>
              <div className="profile">
                <img src={`http://localhost:8000/images/${notification.sender.profilePicture || 'default_profile_picture.jpg'}`} alt="" />
              </div>
              <div className="sender">{notification.sender.email.split("@")[0]} sent a message</div>
            </div>
          ))
      }
    </div>
  );
};

export default Notifications;
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import notificationsLogic from "./logic.hook";
import './notifications.styles.css';
import { useNavigate } from "react-router-dom";

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
                <img src={`http://ec2-35-180-140-53.eu-west-3.compute.amazonaws.com:80/images/${notification.sender.profilePicture || 'default_profile_picture.jpg'}`} alt="" />
              </div>
              <div className="sender">{notification.sender.username} sent a message</div>
            </div>
          ))
      }
    </div>
  );
};

export default Notifications;
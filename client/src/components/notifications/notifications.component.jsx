import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import notificationsLogic from "./logic.hook";
import './notifications.styles.css'
const ENDPOINT = `http://localhost:5000`;
let socket;

const Notifications = ({className=""}) => {
  const { notifications } = notificationsLogic()
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
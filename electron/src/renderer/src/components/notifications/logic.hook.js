import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { extractChatSlice } from '../../core/datasource/localDataSource/chat/chatSlice'
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { NotificationsContext } from "../../utils/contexts/notifications.context";
import { CurrentUserContext } from '../../utils/contexts/current-user.context'
import { useContext } from "react";
const ENDPOINT = `http://ec2-35-180-140-53.eu-west-3.compute.amazonaws.com:443`;
let socket;
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const { notifications, setNotifications } = useContext(NotificationsContext)
  const [socketConnected, setSocketConnected] = useState(false);
  const { setCurrentUser } = useContext(CurrentUserContext)
  let { chat } = useSelector(extractChatSlice)
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connect', () => {
      setSocketConnected(true);
      // Emit the 'setup' event once connected
      socket.emit("setup", user);
      socket.on("message received", (newMessageReceived) => {
        if (Object.keys(chat).length == 0 || chat._id != newMessageReceived.chat._id) {
          const newMessage = newMessageReceived.content
          setNotifications([...notifications, newMessageReceived]);
        }
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [user, notifications, chat]);
  useEffect(() => {
    return () => {
      socket.off("message received", () => {
      });
    };
  }, []);
  const removeNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };
  return { notifications, removeNotification, setCurrentUser }
}
export default useLogic
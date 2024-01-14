import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { NotificationsContext } from "../../utils/contexts/notifications.context";
import { useContext } from "react";
import { extractChatSlice } from "../../core/datasource/localDataSource/chat/chatSlice";
import { CurrentUserContext } from "../../utils/contexts/current-user.context";

const ENDPOINT = `http://localhost:5000`;//
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
          console.log("message received in client")
          const newMessage = newMessageReceived.content
          console.log(notifications, newMessage)
          console.log("message received in client")
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
        console.log("Component unmounted in client")
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
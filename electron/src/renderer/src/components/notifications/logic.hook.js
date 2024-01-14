import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice"
import { useSelector } from "react-redux"
import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import { NotificationsContext } from "../../utils/contexts/notifications.context";
import { useContext } from "react";
const ENDPOINT = `http://localhost:5000`;
let socket;
const useLogic = () => {
  const user = useSelector(extractUserSlice)
  const { notifications, setNotifications } = useContext(NotificationsContext)
  const [socketConnected, setSocketConnected] = useState(false);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connect', () => {
      setSocketConnected(true);
      // Emit the 'setup' event once connected
      console.log("connection is up in electron")
      socket.emit("setup", user);
      socket.on("message received", (newMessageReceived) => {
        console.log("message received in electron")
        setNotifications([...notifications, newMessageReceived]);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [user, notifications]);
  useEffect(() => {
    return () => {
      socket.off("message received", () => {
        console.log("component unmounted in electron")
      });
    };
  }, [socketConnected]);
  return { notifications }
}
export default useLogic
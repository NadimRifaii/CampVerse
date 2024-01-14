import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesDataSource } from "../../core/datasource/remoteDataSource/chat";
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice";
import io from 'socket.io-client';
import { extractChatSlice, setChatX } from "../../core/datasource/localDataSource/chat/chatSlice";
const ENDPOINT = `http://localhost:5000`;
let socket;
let selectedChatCompare;

const useLogic = () => {
  const user = useSelector(extractUserSlice);
  const { chat } = useSelector(extractChatSlice)
  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState('');
  const [content, setContent] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connect', () => {
      console.log("in electron, socket connected");
      setSocketConnected(true);
    });
    socket.emit("setup", user);
    return () => {
      socket.disconnect();
    };
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoadingChat('active');
      const data = await messagesDataSource.accessChat({
        email: `admin@gmail.com`
      });
      dispatch(setChatX(data))
      selectedChatCompare = data;
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoadingChat('');
    }
  };

  const getChatMessages = async () => {
    try {
      if (chat._id) {
        setLoadingChat('active');
        const data = await messagesDataSource.getChatMessages({ chatId: chat._id });
        setMessages(data);
        setLoadingChat('');
        socket.emit("join chat", chat._id);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const typingHandler = (e) => {
    setContent(e.target.value);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && content) {
      setContent("");
      try {
        const response = await messagesDataSource.sendMessage({ chatId: chat._id, content: content });
        socket.emit("new message", response.message);
        setMessages((prevMessages) => [...prevMessages, response.message]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    getChatMessages();
  }, [chat]);
  useEffect(() => {
    const handleNewMessage = (newMessageRecieved) => {
      setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
    };
    socket.on("message received", handleNewMessage);
    return () => {
      socket.off("message received", handleNewMessage);
    };
  }, [selectedChatCompare, messages]);
  return { chat, messages, user, loadingChat, content, typingHandler, sendMessage };
};
export default useLogic;

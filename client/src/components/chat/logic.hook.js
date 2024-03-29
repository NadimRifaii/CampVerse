import { useEffect, useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messagesDataSource } from "../../core/datasource/remoteDataSource/chat";
import { extractUserSlice } from "../../core/datasource/localDataSource/user/userSlice";
import io from 'socket.io-client';
import { extractChatSlice, setChatX } from "../../core/datasource/localDataSource/chat/chatSlice";
import { CurrentUserContext } from "../../utils/contexts/current-user.context";
const ENDPOINT = process.env.REACT_APP_SERVER_NODE;//
let socket;
let selectedChatCompare;

const useLogic = () => {
  const user = useSelector(extractUserSlice);
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser } = currentUserContext || {};
  const { chat } = useSelector(extractChatSlice)
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [content, setContent] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesContainerRef = useRef(null);
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connect', () => {
      setSocketConnected(true);
    });
    socket.emit("setup", user);
    socket.on("user-typing", () => {
      setIsTyping(true)
    })
    socket.on("user-stoped-typing", () => {
      setIsTyping(false)
    })
    return () => {
      socket.disconnect();
      dispatch(setChatX({}))
    };
  }, [user]);
  const fetchUsers = async () => {
    if (currentUser) {
      try {
        setLoadingChat(true);
        const data = await messagesDataSource.accessChat({
          currentUser
        });
        dispatch(setChatX(data))
        selectedChatCompare = data;
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoadingChat(false);
      }
    }
  };

  const getChatMessages = async () => {
    try {
      if (chat._id) {
        setLoadingChat(true);
        const data = await messagesDataSource.getChatMessages({ chatId: chat._id });
        setMessages(data);
        setLoadingChat(false);
        socket.emit("join chat", chat._id);
      }
    } catch (error) {
    }
  };

  const typingHandler = (e) => {
    setContent(e.target.value);
    if (!socketConnected)
      return
    if (!typing) {
      setTyping(true)
      socket.emit("typing", user)
    }
    let lastTypingTime = new Date().getTime()
    let timerLength = 3000
    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timeDifference = timeNow - lastTypingTime
      if (timeDifference > timerLength && typing) {
        socket.emit("stop typing", user)
        setTyping(false)
      }
    }, timerLength)
  };
  const sendMessage = async (event) => {
    if (event.key === "Enter" && content) {
      setContent("");
      try {
        const response = await messagesDataSource.sendMessage({ chatId: chat._id, content: content });
        socket.emit("new message", response.message);
        setMessages((prevMessages) => [...prevMessages, response.message]);
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);


  useEffect(() => {
    getChatMessages();
  }, [chat]);

  useEffect(() => {
    const handleNewMessage = (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    };
    socket.on("message received", handleNewMessage);
    return () => {
      socket.off("message received", handleNewMessage);
    };
  }, [selectedChatCompare, messages]);

  return { chat, messages, user, currentUser, loadingChat, content, messagesContainerRef, isTyping, typingHandler, sendMessage };
};

export default useLogic;

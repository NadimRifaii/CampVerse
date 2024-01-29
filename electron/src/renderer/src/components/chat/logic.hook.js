import { messagesDataSource } from "@renderer/core/datasource/remoteDataSource/chat";
import { useEffect, useState, useRef } from "react";
import { extractUserSlice } from "@renderer/core/datasource/localDataSource/user/userSlice";
import { extractChatSlice, setChatX, removeChat } from "@renderer/core/datasource/localDataSource/chat/chatSlice"
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { CurrentUserContext } from "@renderer/utils/contexts/current-user.context";
import io from 'socket.io-client';
const ENDPOINT = `http://ec2-35-180-140-53.eu-west-3.compute.amazonaws.com:443/`;//
let socket;
let selectedChatCompare;

const useLogic = () => {
  const user = useSelector(extractUserSlice);
  const currentUserContext = useContext(CurrentUserContext);
  const { currentUser } = currentUserContext || {};
  const { chat } = useSelector(extractChatSlice)
  const dispatch = useDispatch()
  const [messages, setMessages] = useState([]);
  const [loadingChat, setLoadingChat] = useState('');
  const [content, setContent] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  // Establish socket connection and handle cleanup
  useEffect(() => {
    socket = io(ENDPOINT);

    // Wait for the "connect" event before emitting other events
    socket.on('connect', () => {
      console.log("in electron, socket connected");
      setSocketConnected(true);
    });
    socket.emit("setup", user);
    socket.on("user-typing", () => {
      console.log("typing event received")
      setIsTyping(true)
    })
    socket.on("user-stoped-typing", () => {
      console.log("stop typing event received")
      setIsTyping(false)
    })
    return () => {
      socket.disconnect();
      dispatch(removeChat({}))
    };
  }, [user]);

  // Fetch users function with error handling and logging
  const fetchUsers = async () => {
    if (currentUser) {
      try {
        setLoadingChat('active');
        const data = await messagesDataSource.accessChat({
          email: currentUser?.email,
          username: currentUser?.username,
          firstname: currentUser?.firstname,
          lastname: currentUser?.lastname,
          profilePicture: currentUser?.profilePicture,
          role: currentUser?.role
        });
        dispatch(setChatX(data))
        selectedChatCompare = data; // Move this line here
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoadingChat('');
      }
    }
  };

  // Get chat messages function
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
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  useEffect(() => {
    console.log(chat)
  }, [chat])

  useEffect(() => {
    getChatMessages();
  }, [chat]);

  useEffect(() => {
    const handleNewMessage = (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        // notification logic
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    };
    socket.on("message received", handleNewMessage);
    return () => {
      socket.off("message received", handleNewMessage);
    };
  }, [selectedChatCompare, messages]);

  return { chat, messages, user, currentUser, loadingChat, content, isTyping, typingHandler, sendMessage };
};

export default useLogic;

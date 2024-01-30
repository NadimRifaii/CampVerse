const ChatModel = require("../models/chat.model")
const UserModel = require("../models/user.model")

const httpAccessChat = async (req, res) => {
  const { email, profilePicture, username, firstname, lastname, role } = req.body
  let user = null;
  if (!email) {
    return res.status(400).json({ "error": "email not provided" })
  } else {
    user = await UserModel.findOne({ email });
    // If user doesn't exist, create a new user
    if (!user) {
      user = new UserModel({
        email: email,
        profilePicture: profilePicture,
        firstname: firstname,
        lastname: lastname,
        username: username,
        role: role
      });
      try {
        await user.save();
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  let isChat = await ChatModel.find({
    isGroupChat: false,
    users: { $all: [req.user._id, user._id] }
  }).populate("users").populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "email"
  });


  if (isChat.length > 0) {
    return res.send(isChat[0])
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, user._id]
    };
    try {
      const createdChat = await ChatModel.create(chatData);
      const fullChat = await ChatModel.findOne({ _id: createdChat._id }).populate("users")
      const { _id, chatName, users, latestMessage } = fullChat
      return res.status(200).contentType('application/json').json({ _id, chatName, users, latestMessage })
    } catch (error) {
      return res.status(400).json({ "error": error })
    }
  }
}

const httpGetUserChats = async (req, res) => {
  try {
    const chatRooms = await ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users").populate("latestMessage")
      .sort({ updatedAt: -1 })
    const populatedChatRooms = await ChatModel.populate(chatRooms, {
      path: "latestMessage.sender",
      select: "email",
    });
    return res.json({ "rooms": populatedChatRooms })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  httpAccessChat,
  httpGetUserChats
}
const ChatModel = require("../models/chat.model")
const UserModel = require("../models/user.model")

const httpAccessChat = async (req, res) => {
  const { email } = req.body
  let user = null;
  if (!email) {
    throw new Error("Email not provided")
  } else {
    user = await UserModel.findOne({ email });
    // If user doesn't exist, create a new user
    if (!user) {
      user = new UserModel({
        email: email,
      });
      try {
        await user.save();
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  let isChat = await ChatModel.find(
    {
      isGroupChat: false,
      $and: [
        {
          users: { $elemMatch: { $eq: req.user._id } },
          users: { $elemMatch: { $eq: user._id } }
        }
      ]
    }
  ).populate("users").populate("latestMessage")
  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "email"
  })
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
      return res.status(200).contentType('application/json').json({ createdChat: fullChat })
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
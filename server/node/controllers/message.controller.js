const ChatModel = require("../models/chat.model")
const MessageModel = require("../models/message.model")
const UserModel = require("../models/user.model")

const httpSendMessage = async (req, res) => {
  const { content, chatId } = req.body
  if (!content || !chatId) {
    return res.status(400).send("Invalid data passed into the request")
  }
  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId
  }
  try {
    let message = await MessageModel.create(newMessage);
    message = await message.populate("sender", "email");
    message = await message.populate("chat")
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "email",
    });
    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    return res.status(200).json({ message: message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
const httpGetChatMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId }).populate("sender", "email").populate("chat")
    return res.status(200).json({ "messages": messages })
  } catch (error) {
    return res.status(400).json({ "error": error })
  }
}
module.exports = {
  httpSendMessage,
  httpGetChatMessages
}
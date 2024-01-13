const ChatModel = require("../models/chat.model")
const MessageModel = require("../models/message.model")
const UserModel = require("../models/user.model")

const httpSendMessage = async (req, res) => {
  const { content, chatId } = req.body
  if (!content || !chatId) {
    return res.status(400).json("Invalid data passed into the request")
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
    console.log(message);
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
module.exports = {
  httpSendMessage
}
/**
 * chatname
 * users
 * latestmessage
 */
const mongoose = require('mongoose')
const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message"
    }
  }, {
  timestamps: true
}
)
const ChatModel = mongoose.model("Chat", chatSchema)
module.exports = ChatModel
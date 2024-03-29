/**
 * chatname
 * users
 * latestmessage
 */
const mongoose = require('mongoose')
const ChatSchema = new mongoose.Schema(
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  }, {
  timestamps: true
}
)
const ChatModel = mongoose.model("Chat", ChatSchema)
module.exports = ChatModel
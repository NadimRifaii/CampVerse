const express = require('express')
const { httpSendMessage, httpGetChatMessages } = require('../controllers/message.controller')
const messageRouter = express.Router()

messageRouter.post("/", httpSendMessage)
messageRouter.get("/:chatId", httpGetChatMessages)
module.exports = messageRouter
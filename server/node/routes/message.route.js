const express = require('express')
const { httpSendMessage } = require('../controllers/message.controller')
const messageRouter = express.Router()

messageRouter.post("/", httpSendMessage)
// messageRouter.get("/", httpGetChatMessages)
module.exports = messageRouter
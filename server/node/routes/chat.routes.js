const express = require('express')
const { httpAccessChat, httpGetUserChats } = require('../controllers/chat.controller.js')
const chatRouter = express.Router()

chatRouter.post("/", httpAccessChat)
chatRouter.get("/", httpGetUserChats)
module.exports = chatRouter
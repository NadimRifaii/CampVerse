const express = require('express')
const { httpAccessChat } = require('../controllers/chat.controller.js')
const chatRouter = express.Router()
chatRouter.get("/", (req, res) => {
  return res.json({ "user": req.user })
})
chatRouter.post("/", httpAccessChat)
// chatRouter.get("/", httpGetUserChats)
module.exports = chatRouter
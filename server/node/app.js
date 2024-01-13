const express = require("express")
const app = express()
const cors = require('cors')
const authMiddleWare = require('./middlewares/auth.middleware.js')
app.use(express.json())// so whenever we pass data from front end to backend , it will be parsed into json format
app.use(cors())
const userRouter = require('./routes/user.routes.js')
const chatRouter = require("./routes/chat.routes.js")
app.use('/api/user', authMiddleWare, userRouter)
app.use('/api/chat', authMiddleWare, chatRouter)
module.exports = app
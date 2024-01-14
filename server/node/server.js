const app = require('./app.js')
const http = require('http')
const dotenv = require('dotenv')
const colors = require('colors')
dotenv.config()
const PORT = process.env.PORT || 5000
const httpServer = http.createServer(app)
const { chats } = require('./data/data.js')
const { default: mongoose } = require('mongoose')
app.get('/', (req, res) => {
  res.send("API is running")
})
app.get('/api/chat', (req, res) => {
  res.send(chats)
})
app.get('/api/chat/:id', (req, res) => {
  const id = req.params.id
  const singleChat = chats.find(c => c._id == id)
  res.send(singleChat)
})
async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready")
  })
  mongoose.connection.once("error", () => {
    console.log("unable to connect")
  })
  try {
    const conn = await mongoose.connect(process.env.MONG_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB connected: ${conn.connection.host}`.blue.bold)
  } catch (error) {
    console.log(error)
  }
  httpServer.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.yellow.bold)
  })
  const io = require("socket.io")(httpServer, {
    pingTimeOut: 60000,//close the connection after 60 seconds after any uesr sent a request
    cors: {
      origin: "*"
    }
  })
  io.on("connection", (socket) => {
    console.log(`connected to socket.io`)
    //this take user data from the frontend
    socket.on('setup', (userData) => {
      socket.join(userData.email)//creates a room for the user
      socket.emit('connected')
    })
    socket.on("join chat", (room) => {
      socket.join(room._id)
      console.log("User joined room: " + room)
    })
    socket.on("new message", (newMessageReceived) => {
      const chat = newMessageReceived.chat
      if (!chat.users)
        return console.log("Chat.users don't defined")
      chat.users.forEach(user => {
        if (user.email == newMessageReceived.sender.email)
          return
        socket.in(user.email).emit("message received", newMessageReceived)
        if (user.email === socket.id) {
          io.to(user.email).emit("notification", {
            type: "new_message",
            message: "You have a new message!",
            chatId: chat._id, // You can include more details if needed
          });
        }
      })
    })
  })
}
startServer()
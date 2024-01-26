const realTime = (httpServer) => {
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
    socket.on("typing", (user) => {
      console.log(`${user} started typing`)
      socket.broadcast.emit("user-typing", user)
    })
    socket.on("stop typing", (user) => {
      console.log(`${user} stoped typing`)
      socket.broadcast.emit("user-stoped-typing")
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
module.exports = realTime
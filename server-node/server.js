const app = require('./app.js')
const http = require('http')
const dotenv = require('dotenv')
const colors = require('colors')
dotenv.config()
const PORT = process.env.PORT || 5000
const httpServer = http.createServer(app)
const { chats } = require('./data/data.js')
const { default: mongoose } = require('mongoose')
const realTime = require('./real-time.js')
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
  realTime(httpServer)
}
startServer()
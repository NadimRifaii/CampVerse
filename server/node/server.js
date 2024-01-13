const app = require('./app.js')
const http = require('http')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000
const httpServer = http.createServer(app)
const { chats } = require('./data/data.js')
app.get('/', (req, res) => {
  res.send("API is running")
})
app.get('/api/chat/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const singleChat = chats.find(c => c._id == id)
  console.log(singleChat)
  res.send(singleChat)
})
httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
/**
 * "proxy":"http://127.0.0.1:PORT"
 */
const app = require('./app.js')
const http = require('http')
const httpServer = http.createServer(app)
httpServer.listen(5000, () => {
  console.log('Server is running on 5000')
})
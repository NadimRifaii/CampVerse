const express = require("express")
const cors = require('cors')
app.use(express.json())// so whenever we pass data from front end to backend , it will be parsed into json format
app.use(cors())
const app = express()
module.exports = app
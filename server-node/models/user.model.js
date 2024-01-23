const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
  },
  username: {
    type: String
  },
  firsname: {
    type: String
  },
  lastname: {
    type: String
  },
  role: {
    type: String
  }
})
const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel
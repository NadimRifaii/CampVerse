const UserModel = require('../models/user.model.js')
export const httpRegisterUser = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).contentType("application/json").json({ "email": "Invalid email" })
  }
  //server-go
  const userExist = await UserModel.findOne({ email });
  if (!userExist) {
    const user = await UserModel.create({ email })
    if (user)
      return res.status(200).contentType("application/json").json({
        user: {
          _id: user._id,
          email: user.email
        }
      })
    else
      return res.status(400).contentType("application/json").json({ "error": "Failed to create the user" })
  } else {

  }
}
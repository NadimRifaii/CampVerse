const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Forbidden");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.secret);
      let user = await UserModel.findOne({ email: decoded.email });
      // If user doesn't exist, create a new user
      if (!user) {
        user = new UserModel({
          email: decoded.email,
          profilePicture: decoded.profilePicture,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          username: decoded.username,
          role: decoded.role
        });
        await user.save();
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized");
    }
  }
};

module.exports = authMiddleware;
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const blackListTokenModel = require("../models/blackListToken.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlackListedToken = await blackListTokenModel.findOne({ token:token });
    if (isBlackListedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

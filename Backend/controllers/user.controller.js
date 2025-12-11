const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");

// ----------------------------------------------------
// REGISTER USER
// ----------------------------------------------------
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  const { fullname, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      errors: [{ field: "email", message: "User already exists" }]
    });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser(
    fullname.firstname,
    fullname.lastname,
    email,
    hashedPassword
  );

  const token = user.generateAuthToken();

  return res.status(201).json({
    success: true,
    user,
    token
  });
};

// ----------------------------------------------------
// LOGIN USER
// ----------------------------------------------------
module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      errors: [{ field: "email", message: "Invalid email or password" }]
    });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      errors: [{ field: "password", message: "Invalid email or password" }]
    });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);

  return res.status(200).json({
    success: true,
    user,
    token
  });
};

// ----------------------------------------------------
// GET PROFILE
// ----------------------------------------------------
module.exports.getUserProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

// ----------------------------------------------------
// LOGOUT
// ----------------------------------------------------
module.exports.logoutUser = async (req, res) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (token) {
    await blackListTokenModel.create({ token });
  }

  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};
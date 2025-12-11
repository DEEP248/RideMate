const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authUser = require("../middlewares/auth.middleware");

// ----------------------------
// REGISTER VALIDATION
// ----------------------------
router.post(
  "/register",
  [
    body("fullname.firstname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("fullname.lastname")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email format"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

// ----------------------------
// LOGIN VALIDATION
// ----------------------------
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authUser.authUser, userController.getUserProfile);
router.get("/logout", authUser.authUser, userController.logoutUser);

module.exports = router;

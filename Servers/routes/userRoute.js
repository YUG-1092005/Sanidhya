const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  verifyUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

userRouter.get("/verify", verifyUser);

module.exports = userRouter;

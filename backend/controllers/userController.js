import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // set JWT as HTTP-only Cookie (server)
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// access public

const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
});

// access private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// access private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get User Profile");
});

// access private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update User Profile");
});

//ADMIN ROUTES

// access private, by admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("Get all users by admin");
});

// access private, by admin

const getUserById = asyncHandler(async (req, res) => {
  res.send("Get a user by Id by admin");
});

// access private, by admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete a user by admin");
});

// access private, by admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update a user by admin");
});

export {
  registerUser,
  authUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,

  //by admin only
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};

import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect Routes

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the token
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };

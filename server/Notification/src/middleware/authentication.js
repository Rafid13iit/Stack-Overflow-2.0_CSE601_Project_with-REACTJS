import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// Middleware to verify service-to-service communication
const verifyServiceToken = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.type === 'service') {
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized as service');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Combined middleware that accepts either user tokens or service tokens
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt || 
    (req.headers.authorization?.startsWith('Bearer') ? 
      req.headers.authorization.split(' ')[1] : null);

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.type === 'service') {
      next();
    } else {
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    }
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

export { protect, verifyServiceToken };
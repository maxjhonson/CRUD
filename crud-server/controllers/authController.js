const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

exports.signupWithGoogle = async (user) => {
  let currentUser = await User.findOne({ googleId: user.googleId });
  if (currentUser) {
    return currentUser;
  } else {
    const newUser = await User.create(user);
    return newUser;
  }
};

const getUserByToken = async (token, next) => {
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  if (!token) return next(new AppError("User is not logged in"), 401);
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);
  return user;
};

exports.getUserOAuth = catchAsync(async (req, res, next) => {
  const user = await getUserByToken(req.headers.authorization, next);
  res.status(200).json({
    status: "success",
    token: req.headers.authorization,
    data: {
      user: user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  req.user = await getUserByToken(req.headers.authorization, next);
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
};

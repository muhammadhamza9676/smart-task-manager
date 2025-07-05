const User = require('../models/User');
const {CustomError} = require('../utils/authUtils');

const registerUser = async ({ email, password, name }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError('Email already in use', 400);
  }
  const user = await User.create({ email, password, name });
  return { id: user._id, email: user.email, name: user.name };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new CustomError('Invalid email or password', 401);
  }
  return { id: user._id, email: user.email, name: user.name };
};

module.exports = { registerUser, loginUser };
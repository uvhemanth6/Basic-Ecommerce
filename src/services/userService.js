const User = require("../models/User");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};


const createUser = async (userData) => {
  return User.create(userData);
};

const getAllUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

const updateUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

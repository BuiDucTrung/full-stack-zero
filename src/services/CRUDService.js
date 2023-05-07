const connection = require("../config/database");
const User = require("../model/user");

const getAllUser = async () => {
  // const [result, fields] = await connection.query("select * from Users");
  const result = await User.find({});

  return result;
};

const getUserById = async (id) => {
  const results = await User.findById(id).exec();
  let user = results ? results : {};

  return user;
};

const updateUserById = async (email, name, city, userId) => {
  const result = await User.updateOne({ _id: userId }, { email, name, city });
  return result;
};

const deleteUserById = async (userId) => {
  const data = await User.deleteOne({ _id: userId });
  console.log("data", data);
};

module.exports = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
};

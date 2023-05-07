const User = require("../model/user");
const { getAllUser, getUserById, updateUserById, deleteUserById } = require("../services/CRUDService");
const { uploadSingleFile, uploadMultipleFile } = require("../services/fileService");

const getUsersAPI = async (req, res) => {
  const result = await getAllUser();

  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const createUserAPI = async (req, res) => {
  const { email, name, city } = req.body;

  const newUser = await User.create({ email, name, city });

  return res.status(200).json({
    errorCode: 0,
    data: newUser,
  });
};

const updateUserAPI = async (req, res) => {
  const { userId, email, name, city } = req.body;

  const userUpdated = await User.findByIdAndUpdate(userId, { email, name, city });
  return res.status(200).json({
    errorCode: 0,
    data: userUpdated,
  });
};

const deleteUserAPI = async (req, res) => {
  const { userId } = req.body;

  const userDeleted = await User.findByIdAndDelete(userId);

  return res.status(200).json({
    errorCode: 0,
    data: userDeleted,
  });
};

const postUploadApiFile = async (req, res) => {
  let resultUploadFile;
  if (Array.isArray(req.files.image)) {
    resultUploadFile = await uploadMultipleFile(req);
  } else {
    resultUploadFile = await uploadSingleFile(req);
  }
  // console.log(JSON.stringify(resultUploadFile));
  if (resultUploadFile.filter((file) => file?.pathFile).length) {
    return res.send("ok single");
  }
  return res.send("st wrong");
};

module.exports = {
  getUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  postUploadApiFile,
};

const connection = require("../config/database");
const User = require("../model/user");
const { getAllUser, getUserById, updateUserById, deleteUserById } = require("../services/CRUDService");

const getHomepage = async (req, res) => {
  const result = await getAllUser();
  res.render("home.ejs", { listUser: result });
};

const getAboutUs = (req, res) => {
  res.render("sample.ejs");
};

const postCreateUser = async (req, res) => {
  const { email, name, city } = req.body;

  User.create({ email, name, city }, (err, small) => {
    if (err) console.log("err", err);
  });
  res.redirect("/");
};

const getCreatePage = async (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  res.render("update.ejs", { user });
};

const postUpdateUser = async (req, res) => {
  const { userId, email, name, city } = req.body;

  await updateUserById(email, name, city, userId);

  res.redirect("/");
};

const getDeleteUser = async (req, res) => {
  const { userId } = req.params;
  await deleteUserById(userId);
  res.redirect("/");
};

module.exports = {
  getHomepage,
  getAboutUs,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  getDeleteUser,
};

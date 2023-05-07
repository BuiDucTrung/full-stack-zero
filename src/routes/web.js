const express = require("express");
const { getHomepage, getAboutUs, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, getDeleteUser } = require("../controllers/homeController");
const router = express.Router();

//middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time");
  next();
});

router.get("/", getHomepage);
router.get("/about-us", getAboutUs);
router.post("/create-user", postCreateUser);
router.get("/create", getCreatePage);
router.get(`/update/:id`, getUpdatePage);
router.post(`/update-user`, postUpdateUser);
router.get(`/delete-user/:userId`, getDeleteUser);

module.exports = router;

const express = require("express");
const { getUsersAPI, createUserAPI, updateUserAPI, deleteUserAPI, postUploadApiFile } = require("../controllers/apiControllers");
const {
  postCreateCustomer,
  postCreateListCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  deleteListCustomer,
} = require("../controllers/customerController");
const routerAPI = express.Router();

//middleware that is specific to this router
routerAPI.use((req, res, next) => {
  console.log("Time");
  next();
});

routerAPI.get("/", (req, res) => {
  console.log("11111");
  res.send("dwerewrwe");
});

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/create-user", createUserAPI);
routerAPI.put("/update-user", updateUserAPI);
routerAPI.delete("/delete-user", deleteUserAPI);

routerAPI.post("/file", postUploadApiFile);
// routerAPI.post("/files", postUploadMultipleApiFile);

routerAPI.post("/customers", postCreateCustomer);
routerAPI.post("/list-customers", postCreateListCustomer);
routerAPI.get("/customers", getAllCustomers);
routerAPI.put("/update-customer", updateCustomer);
routerAPI.delete("/delete-customer", deleteCustomer);
routerAPI.delete("/delete-customers", deleteListCustomer);

module.exports = routerAPI;

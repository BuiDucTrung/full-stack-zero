const Customer = require("../model/customer");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  updateCustomerSerive,
  deleteCustomerService,
  deleteListCustomerService,
} = require("../services/customerService");
const { uploadMultipleFile, uploadSingleFile } = require("../services/fileService");

const postCreateListCustomer = async (req, res) => {
  const result = await createArrayCustomerService(req.body.customers);
  if (result) {
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else res.send("st wrong");
};

const postCreateCustomer = async (req, res) => {
  const { name, email, phone, address, description } = req.body;
  let resultUploadFile;
  if (Array.isArray(req.files.image)) {
    resultUploadFile = await uploadMultipleFile(req);
  } else {
    resultUploadFile = await uploadSingleFile(req);
  }

  const newCustomer = await createCustomerService({ name, email, phone, address, description, image: resultUploadFile });
  if (newCustomer) {
    return res.status(200).json({
      errorCode: 0,
      data: newCustomer,
    });
  } else res.send("st wrong");
};

const getAllCustomers = async (req, res) => {
  const result = await getAllCustomersService(req);
  if (result) {
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else res.send("st wrong");
};

const updateCustomer = async (req, res) => {
  let resultUploadFile;
  if (Array.isArray(req.files.image)) {
    resultUploadFile = await uploadMultipleFile(req);
  } else {
    resultUploadFile = await uploadSingleFile(req);
  }
  const result = await updateCustomerSerive({ ...req.body, image: resultUploadFile });
  if (result) {
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else res.send("st wrong");
};

const deleteCustomer = async (req, res) => {
  const result = await deleteCustomerService(req);
  if (result) {
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else res.send("st wrong");
};

const deleteListCustomer = async (req, res) => {
  const result = await deleteListCustomerService(req);
  if (result) {
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } else res.send("st wrong");
};

module.exports = { postCreateCustomer, postCreateListCustomer, getAllCustomers, updateCustomer, deleteCustomer, deleteListCustomer };

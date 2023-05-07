const Customer = require("../model/customer");

const createCustomerService = async (props) => {
  const { name, email, phone, address, description, image = "" } = props;
  try {
    const newCustomer = await Customer.create({ name, email, phone, address, description, image });
    return newCustomer;
  } catch (error) {
    console.log("error", error);

    return null;
  }
};

const createArrayCustomerService = async (listCustomer) => {
  try {
    const newListCustomer = await Customer.insertMany(listCustomer);
    return newListCustomer;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const getAllCustomersService = async (req) => {
  const { limit = 10, page = 1, name = "", address = "" } = req.query;
  console.log("req.query", address.split(","));

  const skip = (+page - 1) * limit;
  try {
    const dataCustomers = await Customer.find({ name: { $regex: ".*" + name + ".*" }, address: { $regex: `^.*${address.split(",")}.*$` } })
      .limit(limit)
      .skip(skip)
      .exec();
    return dataCustomers;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const updateCustomerSerive = async (reqBody) => {
  const { email, id, description, name, address, image } = reqBody;
  try {
    const customer = await Customer.findByIdAndUpdate({ _id: id }, { email, description, name, address, image });
    return customer;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const deleteCustomerService = async (req) => {
  const { id } = req.body;
  try {
    const customer = await Customer.deleteById(id);
    return customer;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const deleteListCustomerService = async (req) => {
  const { idCustomers } = req.body;
  try {
    const listCusDeleted = await Customer.delete({ _id: { $in: idCustomers } });
    return listCusDeleted;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  updateCustomerSerive,
  deleteCustomerService,
  deleteListCustomerService,
};

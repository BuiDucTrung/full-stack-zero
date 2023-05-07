const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,
    email: String,
    image: Array,
    description: String,
  },
  {
    timestamps: true,
  }
);

customerSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: true });
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

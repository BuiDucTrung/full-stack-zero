const { default: mongoose } = require("mongoose");
require("dotenv").config();
//test connection

const connection = async () => {
  const dbState = [
    {
      value: 0,
      label: "disconnected",
    },
    {
      value: 1,
      label: "connected",
    },
    {
      value: 2,
      label: "connecting",
    },
    {
      value: 3,
      label: "disconnecting",
    },
  ];
  try {
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
    };
    await mongoose.connect(process.env.DB_HOST, options);

    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value == state).label, "to db");
  } catch (error) {
    console.log("error connection db", error);
  }
};

module.exports = connection;

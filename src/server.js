const express = require("express");
const path = require("path");

require("dotenv").config();
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
const { default: mongoose } = require("mongoose");
const routerAPI = require("./routes/api");

const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
//config template engine
configViewEngine(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config file upload
app.use(fileUpload());

//import routes
app.use("/", webRoutes);
app.use("/v1/api", routerAPI);

connection();

mongoose.connection.on("connected", () => {
  app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

// (async () => {
//   try {
//     await connection();
//     app.listen(port, hostname, () => {
//       console.log(`Example app listening on port ${port}`);
//     });

//   } catch (error) {
//     console.log("error connect to db", error);
//   }
// })();

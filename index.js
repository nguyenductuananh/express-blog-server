const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/blog", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let UserController = require("./route/User.route");
let AccountController = require("./route/Account.route");
let CategoryController = require("./route/Category.route");
let StatusController = require("./route/Status.route");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/user", UserController);
app.use("/api/account", AccountController);
app.use("/api/category", CategoryController);
app.use("/api/status", StatusController);
app.listen(1902, () => {
  console.log("Running at port 1902");
});

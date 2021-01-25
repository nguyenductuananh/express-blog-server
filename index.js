const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog");
let UserController = require('./route/User.route');
app.use("/api/user", UserController);
app.listen(8080, ()=> {console.log("Running at port 8080")});
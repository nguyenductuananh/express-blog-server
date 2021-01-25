const express = require('express');
const route = express.Router();
const User = require("../model/User.model");
route.get("/", async (req, res) =>{
    let u = await User.find();
    res.send(u);
});

module.exports = route;
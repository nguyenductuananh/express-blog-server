const express = require("express");
const route = express.Router();

const Account = require("../model/Account.model");
const User = require("../model/User.model");
route.get("/", async (req, res) => {
  let filters = {};
  //Page filter
  filters.page = parseInt(req.query.page) || 0;
  //Limit per page
  filters.limit = parseInt(req.query.limit) || 6;
  //Count number of status
  filters.max = await Account.countDocuments();
  let package = await Account.find()
    .skip(filters.page === 0 ? 0 : (filters.page - 1) * filters.limit)
    .limit(filters.limit);
  //Add filters to final package
  package.filters = filters;
  res.send({ data: package, filters });
});
route.get("/:id", async (req, res) => {
  let id = req.params.id;
  let package = await Account.findById(id);
  res.send(package);
});

route.post("/", async function (req, res) {
  let package = req.body;
  let account = await Account.findOne(package);
  if (account) {
    let user = await User.findOne(account.user.$id);
    res.send(user);
  } else {
    res.send({});
  }
});

route.put("/", async function (req, res) {
  let package = req.body;
  package = await Account.updateOne({ _id: package._id }, package);
  res.send(package);
});

route.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let package = await Account.findByIdAndDelete(id);
  res.send(package);
});
module.exports = route;

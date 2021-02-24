const express = require("express");
const route = express.Router();

const Status = require("../model/Status.model");
route.get("/", async (req, res) => {
  let filters = {};
  let obj = {};
  //Page
  filters.page = parseInt(req.query.page) || 0;

  //Limit per page
  filters.limit = parseInt(req.query.limit) || 6;

  //Filter by category
  let category = req.query.category;
  if (category) {
    obj.categories = { $all: [category] };
  }
  //Filter by name
  let name = req.query.name;
  if (name) {
    obj.title = { $regex: name };
  }
  let package = await Status.find(obj);
  let start = filters.page === 0 ? 0 : (filters.page - 1) * filters.limit;
  //Count number of status
  filters.max = package.length;
  package = package.slice(start, start + filters.limit);
  //Add filters to final package
  package.filters = filters;
  res.send({ data: package, filters });
});
route.get("/:id", async (req, res) => {
  let id = req.params.id;
  let package = await Status.findById(id);
  res.send(package);
});

route.post("/", async function (req, res) {
  let package = req.body;
  package = await Status.create(package);
  res.send(package);
});

route.put("/", async function (req, res) {
  let package = req.body;
  package = await Status.updateOne({ _id: package._id }, package);
  res.send(package);
});

route.delete("/:id", async (req, res) => {
  let id = req.params.id;
  let package = await Status.findByIdAndDelete(id);
  res.send(package);
});
module.exports = route;

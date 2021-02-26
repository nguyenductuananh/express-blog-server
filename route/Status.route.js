const express = require("express");
const route = express.Router();

const Category = require("../model/Category.model");
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
  //Count
  filters.max = await Status.countDocuments();
  //Get data
  let allCategories = await Category.find();
  Status.find(obj)
    .skip(filters.page === 0 ? 0 : (filters.page - 1) * filters.limit)
    .limit(filters.limit)
    .then((data) => {
      let package = [...data];
      for (let item of package) {
        item.categories = item.categories.map((cate) => {
          let result;
          for (let c of allCategories) {
            if (c._id.toString() === cate) {
              result = c.name;
            }
          }
          return result;
        });
      }
      package.filters = filters;
      // console.log(package);
      res.send({ data: package, filters });
    })
    .catch((err) => console.log(err));
  //Map category's id to category's name
  //Add filters to final package
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

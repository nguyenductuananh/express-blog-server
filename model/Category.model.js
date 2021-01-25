const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name : String
});

const Category = mongoose.model("Category", CategorySchema, "Category");

module.exports = Category;
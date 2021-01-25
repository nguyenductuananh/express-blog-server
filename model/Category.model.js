const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name : String
}, {
    versionKey : false
});

const Category = mongoose.model("Category", CategorySchema, "Category");

module.exports = Category;
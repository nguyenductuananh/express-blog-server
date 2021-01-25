const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
    name : String,
    position : String
}, {
    versionKey : false
});

const User = mongoose.model("User", UserScheme, "User");

module.exports = User;
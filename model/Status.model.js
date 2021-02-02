const mongoose = require("mongoose");

const StatusScheme = new mongoose.Schema({
    content : String,
    created : Date,
    title : String,
    imgPath : String,
    categories : Array,
    user : {
        $ref : String, 
        $id : mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey : false
});

const Status = mongoose.model("Status", StatusScheme, "Status");

module.exports = Status;
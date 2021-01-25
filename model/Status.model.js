const mongoose = require("mongoose");

const StatusScheme = new mongoose.Schema({
    content : String,
    created : Date,
    title : String,
    imgPath : String,
    category : Array,
    user : {
        $ref : String, 
        $id : mongoose.Schema.Types.ObjectId
    }
});

const Status = mongoose.model("Status", StatusScheme, "Status");

module.exports = Status;
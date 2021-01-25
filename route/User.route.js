const express = require('express');
const route = express.Router();

const User = require("../model/User.model");
route.get("/", async (req, res) =>{
    let u = await User.find();
    res.send(u);
});
route.get("/:id", async (req, res) =>{
    let id = req.params.id;
    let u = await User.findById(id);
    res.send(u);
});

route.post("/", async function(req, res){
    let u = req.body;
    u = await User.create(u);
    res.send(u);
});

route.put("/", async function(req, res){
    let u = req.body;
    u = await User.updateOne({_id : u._id}, u);
    res.send(u);
});

route.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let u = await User.findByIdAndDelete(id);
    res.send(u);
});
module.exports = route;
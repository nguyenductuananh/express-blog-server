const express = require('express');
const route = express.Router();

const Account = require("../model/Account.model");
route.get("/", async (req, res) =>{
    let u = await Account.find();
    res.send(u);
});
route.get("/:id", async (req, res) =>{
    let id = req.params.id;
    let u = await Account.findById(id);
    res.send(u);
});

route.post("/", async function(req, res){
    let u = req.body;
    u = await Account.create(u);
    res.send(u);
});

route.put("/", async function(req, res){
    let u = req.body;
    u = await Account.updateOne({_id : u._id}, u);
    res.send(u);
});

route.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let u = await Account.findByIdAndDelete(id);
    res.send(u);
});
module.exports = route;
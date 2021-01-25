const express = require('express');
const route = express.Router();

const Status = require("../model/Status.model");
route.get("/", async (req, res) =>{
    let u = await Status.find();
    res.send(u);
});
route.get("/:id", async (req, res) =>{
    let id = req.params.id;
    let u = await Status.findById(id);
    res.send(u);
});

route.post("/", async function(req, res){
    let u = req.body;
    u = await Status.create(u);
    res.send(u);
});

route.put("/", async function(req, res){
    let u = req.body;
    u = await Status.updateOne({_id : u._id}, u);
    res.send(u);
});

route.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let u = await Status.findByIdAndDelete(id);
    res.send(u);
});
module.exports = route;
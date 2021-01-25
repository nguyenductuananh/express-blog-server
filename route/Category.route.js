const express = require('express');
const route = express.Router();

const Category = require("../model/Category.model");
route.get("/", async (req, res) =>{
    let u = await Category.find();
    res.send(u);
});
route.get("/:id", async (req, res) =>{
    let id = req.params.id;
    let u = await Category.findById(id);
    res.send(u);
});

route.post("/", async function(req, res){
    let u = req.body;
    u = await Category.create(u);
    res.send(u);
});

route.put("/", async function(req, res){
    let u = req.body;
    u = await Category.updateOne({_id : u._id}, u);
    res.send(u);
});

route.delete('/:id', async (req, res) =>{
    let id = req.params.id;
    let u = await Category.findByIdAndDelete(id);
    res.send(u);
});
module.exports = route;
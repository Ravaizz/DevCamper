const mongoose = require('mongoose');
const Bootcamp = require('../models/bootcamp.model');



exports.create = async function (req, res, next) { 
   
    let bootcamp = new Bootcamp();
    bootcamp.name = req.body.name;
    bootcamp.averageCost = req.body.averageCost;
    bootcamp.user= req.userId.user._id;
    await bootcamp.save((err, bootcamp) => {
        if (err) { return next(err) };
        res.send(bootcamp);
    })

};



exports.read = async function (req, res, next) {
  
    await Bootcamp.findOne({ _id: req.params.id }).then((Bootcamp) => {
        if (!Bootcamp) { return next(err) };
        res.send(Bootcamp);
    }).catch(next);
};

exports.read_all = async function (req, res, next) {
    res.send(res.advancedQuery)
};



exports.update = async function (req, res, next) {
    let bootcamp= await Bootcamp.findById(req.params.id)
    if(bootcamp.user.valueOf() !== req.userId.user._id) {
       return next(new Error())
    }
    await Bootcamp.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }).then((Bootcamp) =>
     {
        if (!Bootcamp) {  
            return next(new Error()) 
         }
        res.send("Update successfully!");
    }).catch(next);

};


exports.delete = async function (req, res, next) {
    let bootcamp= await Bootcamp.findById(req.params.id)
    if(bootcamp.user.valueOf() !== req.userId.user._id) {
       return next(new Error())
    }
   
    await Bootcamp.findOneAndDelete({ _id: req.params.id }).then((Bootcamp) => {
        if (!Bootcamp) { if (err) { return next(err) }; }
        res.send("Delete successfully!");
    }).catch(next);

};




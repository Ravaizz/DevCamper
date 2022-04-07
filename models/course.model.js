const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    weeks: { type: Number, required: true },
    bootcamp: {type: mongoose.Schema.ObjectId,ref: 'Bootcamp',required: true},
    user: {type: mongoose.Schema.ObjectId,ref: 'User',required: true}
});


module.exports = mongoose.model('Course', CourseSchema);

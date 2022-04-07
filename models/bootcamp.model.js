const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BootcampSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    averageCost: { type: Number, required: true },
    user: {type: mongoose.Schema.ObjectId,ref: 'User',required: true}
});


module.exports = mongoose.model('Bootcamp', BootcampSchema);
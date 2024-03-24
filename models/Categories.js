const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    title:{type:String, required:true},
    ImageUrl:{type:String, required:true},
    value:{type:String, required:true}
},{timestamps:true});

module.exports = mongoose.model('Category', categorySchema)
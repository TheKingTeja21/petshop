const mongoose = require("mongoose");
const Orderschema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    sellerId:{type:String,required:true},
    imageurl:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
    payment_id:{type:String,required:true,unique:true},
    quantity:{type:Number,required:true},
    subtotal:{type:Number,required:true},
    total:{type:Number,required:true},
    payment_status:{type:String,default:"pending",enum:["faild","pending","successfully paid"]},
    delivery_status:{type:String,default:"Shipping",enum:["Shipping","Today Delivery","successfully Deliveryed"]}



}, { timestamps: true });

module.exports = mongoose.model("Order", Orderschema);

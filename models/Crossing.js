const mongoose = require('mongoose');
const {checkVideoDuration}=require('./appointment')
const Crossing=  new mongoose.Schema({
    Category:{type:String,required:true},
    Breed_name:{type:String,required:true},
    Gender:{type:String,required:true},
    Quality:{type:String,required:true},
    imageurl:{type: [String],
      validate: {
        validator: function (v) {
          return v.length > 0 && v.length <= 4;
        },
        message: props => `You can upload between 1 and 4 images, but you provided ${props.value.length}!`
      },
      required: true,},
    mating_video:{ 
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          if (v.endsWith(".mp4")) {
            try {
              return await checkVideoDuration(v);
            } catch (error) {
              return false;
            }
          }
          return true;
        },
        message: () => `Video duration must not be more than 10 seconds!`,
      },},
    Breeder_Name:{type:String,required:true},
    aadhar_Number:{type:Number,required:true},
    Address:{type:String,required:true},
    Contact_Number: {
        type: String,
        validate: {
          validator: function (v) {
            return /^\d{10}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid 10-digit number!`,
        },
        required: true,
      },
      vaccination:{type:String,required:true},
    location:{type:String,required:true},
    age:{type:Number,required:true},
    Breed_Leanage:{type:String,required:true},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"User" }
},{timestamps:true})

module.exports = mongoose.model("Crossing", Crossing);
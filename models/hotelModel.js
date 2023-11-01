const mongoose = require("mongoose");



 const hotelSchema = new mongoose.Schema({
    name:String,
    email:String,
    location:String,
    city:String,
    owner:String,
    openingHour:String,
    closingHour:String,
    rating:String,
    oredrs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    menu:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
        enum:["open","closed"]
    },
    password:{
        type:String
    }

 })


 module.exports = mongoose.model("hotel",hotelSchema)
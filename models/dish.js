const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({

   dishName:String,
   price:Number,
   quantity:String,
   category:String,
   dietary:{
       type:String,
       enum:["vegeterian","non-vegeterian"]
   },
   ingredients:{
    type:Array,
    default:[],
   },
   discription:String,
   image:{
    type:String,
    default:""
   }


})


module.exports = mongoose.model("dish",dishSchema)
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require("../models/userModel");
const { sendtoken } = require("../utils/SendToken");


exports.home =  catchAsyncErrors(async(req,res,next)=>{
   const data = await Data.find();
   res.status(200).json({data})

})

exports.register = catchAsyncErrors(async(req,res,next)=>{
      const user =  await new userModel(req.body).save();
      sendtoken(user,200,res);
      console.log(user);
      res.json({user});
}) 




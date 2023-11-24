const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");


exports.home =  catchAsyncErrors(async(req,res,next)=>{
  
   res.status(200).json({message:"welcome to home"})

})

exports.currentUser = catchAsyncErrors(async(req,res,next)=>{
      const user = await userModel.findById(req.id);
      res.json({user});
})

exports.userRegister = catchAsyncErrors(async(req,res,next)=>{
      const user =  await new userModel(req.body).save();
      sendtoken(user,200,res);
      console.log(user);
      res.json({user});
}) 

exports.userLogin = catchAsyncErrors(async(req,res,next)=>{
   const user = await userModel.findOne({email :req.body.email }).select("+password").exec();

   if(!user){
      return ErrorHandler("user not found with this email address");
   }
  
   const isMatch = user.comparepassword(req.body.password);

   if(!isMatch){
      return ErrorHandler("worng password");
   }
   console.log(isMatch)

   sendtoken(user,200,res);

})


exports.addItemInMenu = catchAsyncErrors(async(req,res,next)=>{
  
  //sajjan made some chaneges of menu 
})
   

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [4, "First Name must not contain more than 14 characters"],
    },
    lastname: {
      type:String,
      required: [true, "Last Name is required"],
    },
    email: {
      type:String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      minLength: [10, "Contact must contain 10 characters"],
      maxLength: [10, "Contact must contain 10 characters"],
    },
    city:{
        type: String
    },
    address:{
        type: String,
        
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    cart: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: "dish",
      },
    ],

    password:{
        type: String,
        select:false,
        required:[true,"password is required"]
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.comparepassword = function(password){
  return bcrypt.compareSync(password,this.password)
}

userSchema.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("user", userSchema);

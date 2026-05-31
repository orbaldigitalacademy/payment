const mongoose =
require("mongoose");

const paymentSchema =
new mongoose.Schema({

  reference:{
    type:String,
    unique:true
  },

  email:String,

  amount:Number,

  status:String,

  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }

},{
 timestamps:true
});

module.exports =
mongoose.model(
 "Payment",
 paymentSchema
);
const mongoose =
require("mongoose");

const enrollmentSchema =
new mongoose.Schema({

  name:String,

  email:String,

  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  },

  paymentReference:String

},{
 timestamps:true
});

module.exports =
mongoose.model(
 "Enrollment",
 enrollmentSchema
);
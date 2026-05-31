const mongoose =
require("mongoose");

const courseSchema =
new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: String,

  amount: {
    type: Number,
    required: true
  },

  classroomLink: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "Course",
  courseSchema
);
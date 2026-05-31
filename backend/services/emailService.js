const transporter =
 require("../config/mailer");

const courses =
 require("../config/courses");
 
const Course =
require("../models/Course");

exports.sendEnrollmentEmail =
 async(
  email,
  name,
  course
 )=>{

  const classroomLink =
   courses[course];

  await transporter.sendMail({

   from:
   process.env.EMAIL_USER,

   to:email,

   subject:
   "Enrollment Successful",

   html:`

    <h2>Hello ${name}</h2>

    <p>
      Payment successful.
    </p>

    <p>
      Click below to join class.
    </p>

    <a href="${classroomLink}">
      Join Google Classroom
    </a>

   `
  });
 };
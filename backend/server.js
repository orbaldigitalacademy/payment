require("dotenv").config();

const express = require("express");
const cors = require("cors");

const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const connectDB =
require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/payments",paymentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);

app.listen(
 process.env.PORT,
 ()=>console.log(
  "Server Started"
 )
);
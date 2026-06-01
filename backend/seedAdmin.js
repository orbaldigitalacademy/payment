const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // Adjust path if needed

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/lmsdb";

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin =
      await Admin.findOne({
        email: "admin@orbal.com",
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists."
      );
      process.exit();
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        "Admin2026!",
        10
      );

    // Create admin
    const admin =
      await Admin.create({
        name: "Super Admin",
        email:
          "admin@orbal.com",
        password:
          hashedPassword,
      });

    console.log(
      "Admin created successfully:"
    );
    console.log({
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });

    process.exit();
  } catch (error) {
    console.error(
      "Error seeding admin:",
      error
    );
    process.exit(1);
  }
};

seedAdmin();
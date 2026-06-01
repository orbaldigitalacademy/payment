const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Payment = require("../models/Payment");
const Enrollment = require("../models/Enrollment");

/**
 * Login Admin
 */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Dashboard Statistics
 */
const getDashboardStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();

    const activeCourses = await Course.countDocuments({
      active: true,
    });

    const totalPayments = await Payment.countDocuments();

    const totalEnrollments = await Enrollment.countDocuments();

    const revenueResult = await Payment.aggregate([
      {
        $match: { status: "success" },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.json({
      success: true,
      data: {
        totalCourses,
        activeCourses,
        totalPayments,
        totalEnrollments,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Enrollments
 */
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("courseId", "title amount")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Payments
 */
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("courseId", "title amount")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  getDashboardStats,
  getEnrollments,
  getPayments,
};
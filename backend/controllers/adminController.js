const Course =
  require("../models/Course");

const Payment =
  require("../models/Payment");

const Enrollment =
  require("../models/Enrollment");

/**
 * Dashboard Statistics
 */
exports.getDashboardStats =
  async (req, res) => {
    try {
      const totalCourses =
        await Course.countDocuments();

      const activeCourses =
        await Course.countDocuments({
          active: true,
        });

      const totalPayments =
        await Payment.countDocuments();

      const totalEnrollments =
        await Enrollment.countDocuments();

      const revenueResult =
        await Payment.aggregate([
          {
            $match: {
              status: "success",
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$amount",
              },
            },
          },
        ]);

      const totalRevenue =
        revenueResult.length > 0
          ? revenueResult[0]
              .totalRevenue
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
        message:
          error.message,
      });
    }
  };

/**
 * Get Enrollments
 */
exports.getEnrollments =
  async (req, res) => {
    try {
      const enrollments =
        await Enrollment.find()
          .populate(
            "courseId",
            "title amount"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        data: enrollments,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/**
 * Get Payments
 */
exports.getPayments =
  async (req, res) => {
    try {
      const payments =
        await Payment.find()
          .populate(
            "courseId",
            "title amount"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        data: payments,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getEnrollments,
  getPayments,
} = require(
  "../controllers/adminController"
);

router.post("/login", (req, res) => {
  res.json({ message: "Admin login" });
});

/**
 * Dashboard Summary
 */
router.get(
  "/dashboard",
  authMiddleware,
  getDashboardStats
);

/**
 * All Enrollments
 */
router.get(
  "/enrollments",
  authMiddleware,
  getEnrollments
);

/**
 * All Payments
 */
router.get(
  "/payments",
  authMiddleware,
  getPayments
);

module.exports = router;
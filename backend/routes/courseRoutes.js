const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  activateCourse,
  deactivateCourse
} = require("../controllers/courseController");

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.post("/", authMiddleware, createCourse);

router.put("/:id", authMiddleware, updateCourse);

router.delete("/:id", authMiddleware, deleteCourse);
router.patch("/:id/activate", authMiddleware, activateCourse);
router.patch("/:id/deactivate", authMiddleware, deactivateCourse);

module.exports = router;
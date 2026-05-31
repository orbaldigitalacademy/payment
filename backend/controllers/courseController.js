const Course = require("../models/Course");

/**
 * GET ALL ACTIVE COURSES
 * GET /api/courses
 */
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Get Courses Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE COURSE
 * GET /api/courses/:id
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Get Course Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

/**
 * CREATE COURSE
 * POST /api/courses
 */
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      amount,
      classroomLink,
    } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: "Title and amount are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      amount,
      classroomLink,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Create Course Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

/**
 * UPDATE COURSE
 * PUT /api/courses/:id
 */
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Update Course Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

/**
 * DELETE COURSE
 * DELETE /api/courses/:id
 */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

/**
 * ACTIVATE COURSE
 * PATCH /api/courses/:id/activate
 */
exports.activateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { active: true },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course activated",
      data: course,
    });
  } catch (error) {
    console.error("Activate Course Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to activate course",
      error: error.message,
    });
  }
};

/**
 * DEACTIVATE COURSE
 * PATCH /api/courses/:id/deactivate
 */
exports.deactivateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deactivated",
      data: course,
    });
  } catch (error) {
    console.error("Deactivate Course Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate course",
      error: error.message,
    });
  }
};
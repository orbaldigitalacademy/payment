import { useState } from "react";
import { createCourse } from "../api/courseApi";

export default function CourseForm({ onCourseCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    classroomLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        amount: Number(formData.amount),
        classroomLink: formData.classroomLink.trim(),
      };

      const response = await createCourse(payload);

      setMessage(
        response.message || "Course created successfully."
      );

      setFormData({
        title: "",
        description: "",
        amount: "",
        classroomLink: "",
      });

      if (onCourseCreated) {
        onCourseCreated(response.data);
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to create course."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form-container">
      <h2>Create New Course</h2>

      {message && (
        <div className="alert-message">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Course Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Data Science Fundamentals"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Description
          </label>

          <textarea
            name="description"
            rows="5"
            placeholder="Course description..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>
            Price (₦)
          </label>

          <input
            type="number"
            name="amount"
            placeholder="25000"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Google Classroom Link
          </label>

          <input
            type="url"
            name="classroomLink"
            placeholder="https://classroom.google.com/..."
            value={formData.classroomLink}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Course"}
        </button>
      </form>
    </div>
  );
}
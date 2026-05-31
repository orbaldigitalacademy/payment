import {
  useEffect,
  useState,
} from "react";

import {
  getCourses,
} from "../api/courseApi";

import {
  initializePayment,
} from "../api/paymentApi";

export default function EnrollmentForm() {

  const [courses,
    setCourses] =
    useState([]);

  const [form,
    setForm] =
    useState({
      name: "",
      email: "",
      courseId: "",
    });

  useEffect(() => {

    const loadCourses =
      async () => {

        const response =
          await getCourses();

        setCourses(
          response.data
        );
      };

    loadCourses();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const payment =
        await initializePayment(
          form
        );

      window.location.href =
        payment.authorization_url;
    };

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label>Select Course</label>

        <select
          value={form.courseId}
          onChange={(e) =>
            setForm({
              ...form,
              courseId: e.target.value,
            })
          }
          required
        >
          <option value="">
            Select Course
          </option>

          {courses.map((course) => (
            <option
              key={course._id}
              value={course._id}
            >
              {course.title} - ₦{course.amount}
            </option>
          ))}
        </select>
      </div>

    <button type="submit">
      Proceed With Payment
    </button>

    </form>
  );
}
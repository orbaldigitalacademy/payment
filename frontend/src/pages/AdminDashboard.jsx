import { useEffect, useState } from "react";

import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

import {
  getCourses,
} from "../api/courseApi";

export default function AdminDashboard() {

  const [courses, setCourses] =
    useState([]);

  const loadCourses = async () => {
    try {
      const response =
        await getCourses();

      setCourses(
        response.data || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>
        Admin Dashboard
      </h1>

      <CourseForm
        onCourseCreated={
          loadCourses
        }
      />

      <hr />

      <CourseList
        courses={courses}
        refreshCourses={
          loadCourses
        }
      />
    </div>
  );
}
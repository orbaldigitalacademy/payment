import api from "./axios";

/**
 * GET ALL COURSES
 */
export const getCourses = async () => {
  const response = await api.get("/courses");

  return response.data;
};

/**
 * GET SINGLE COURSE
 */
export const getCourseById = async (id) => {
  const response = await api.get(
    `/courses/${id}`
  );

  return response.data;
};

/**
 * CREATE COURSE
 */
export const createCourse = async (
  courseData
) => {
  const response = await api.post(
    "/courses",
    courseData
  );

  return response.data;
};

/**
 * UPDATE COURSE
 */
export const updateCourse = async (
  id,
  courseData
) => {
  const response = await api.put(
    `/courses/${id}`,
    courseData
  );

  return response.data;
};

/**
 * DELETE COURSE
 */
export const deleteCourse = async (
  id
) => {
  const response = await api.delete(
    `/courses/${id}`
  );

  return response.data;
};

/**
 * ACTIVATE COURSE
 */
export const activateCourse = async (
  id
) => {
  const response = await api.patch(
    `/courses/${id}/activate`
  );

  return response.data;
};

/**
 * DEACTIVATE COURSE
 */
export const deactivateCourse =
  async (id) => {
    const response =
      await api.patch(
        `/courses/${id}/deactivate`
      );

    return response.data;
  };
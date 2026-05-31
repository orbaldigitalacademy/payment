import {
  deleteCourse,
  activateCourse,
  deactivateCourse,
} from "../api/courseApi";

export default function CourseList({
  courses,
  refreshCourses,
}) {

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete this course?"
        )
      ) {
        return;
      }

      try {
        await deleteCourse(id);
        refreshCourses();
      } catch (error) {
        console.error(error);
      }
    };

  const handleToggle =
    async (course) => {

      try {

        if (course.active) {
          await deactivateCourse(
            course._id
          );
        } else {
          await activateCourse(
            course._id
          );
        }

        refreshCourses();

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <h2>Courses</h2>

      <table
        border="1"
        width="100%"
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {courses.map(
            (course) => (
              <tr
                key={
                  course._id
                }
              >
                <td>
                  {
                    course.title
                  }
                </td>

                <td>
                  ₦
                  {
                    course.amount
                  }
                </td>

                <td>
                  {course.active
                    ? "Active"
                    : "Inactive"}
                </td>

                <td>

                  <button
                    onClick={() =>
                      handleToggle(
                        course
                      )
                    }
                  >
                    {course.active
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        course._id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
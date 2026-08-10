import { useContext } from "react";
import { Link } from "react-router-dom";
import { EnrollmentContext } from "../context/EnrollmentContext";

function EnrolledCoursesPage() {
  const { enrolledCourses, removeCourse } =
    useContext(EnrollmentContext);

  return (
    <div>
      <h1>My Enrolled Courses</h1>

      <Link to="/courses">Browse Courses</Link>

      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        enrolledCourses.map((course) => (
          <div key={course.id}>
            <h3>{course.title}</h3>

            <button onClick={() => removeCourse(course.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default EnrolledCoursesPage;
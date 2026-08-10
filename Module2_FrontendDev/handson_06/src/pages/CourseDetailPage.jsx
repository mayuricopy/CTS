import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EnrollmentContext } from "../context/EnrollmentContext";
import { addCourse } from "../store/courseSlice";

const courses = [
  { id: 1, title: "React Fundamentals" },
  { id: 2, title: "JavaScript Essentials" },
  { id: 3, title: "Frontend Development" },
];

function CourseDetailPage() {
  const { courseId } = useParams();
  const { enrollCourse } = useContext(EnrollmentContext);
  const dispatch = useDispatch();

  const course = courses.find(
    (course) => course.id === Number(courseId)
  );

  if (!course) {
    return <h1>Course not found</h1>;
  }

  const handleEnroll = () => {
    enrollCourse(course);
    dispatch(addCourse(course));
  };

  return (
    <div>
      <h1>{course.title}</h1>

      <p>Course ID: {course.id}</p>

      <button onClick={handleEnroll}>
        Enroll in Course
      </button>

      <br />
      <br />

      <Link to="/courses">Back to Courses</Link>
    </div>
  );
}

export default CourseDetailPage;
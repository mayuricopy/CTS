import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCourse } from "../store/courseSlice";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enrolledCourses = useSelector(
    (state) => state.courses.enrolledCourses
  );

  return (
    <div>
      <h1>Profile Page</h1>

      <button onClick={() => navigate("/courses")}>
        Go to Courses
      </button>

      <button onClick={() => navigate("/")}>
        Go Home
      </button>

      <h2>Redux Enrolled Courses</h2>

      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        enrolledCourses.map((course) => (
          <div key={course.id}>
            <p>{course.title}</p>

            <button onClick={() => dispatch(removeCourse(course.id))}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePage;
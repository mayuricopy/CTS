import { Link } from "react-router-dom";

const courses = [
  { id: 1, title: "React Fundamentals" },
  { id: 2, title: "JavaScript Essentials" },
  { id: 3, title: "Frontend Development" },
];

function CoursesPage() {
  return (
    <div>
      <h1>Courses Page</h1>

      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/profile">Profile</Link>
      </nav>

      <h2>Available Courses</h2>

      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <Link to={`/courses/${course.id}`}>
            View Course
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CoursesPage;
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";
import courses from "./courseData";

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiCourses, setApiCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentName, setStudentName] = useState("");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();

        setApiCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  useEffect(() => {
  document.title = studentName
    ? `${studentName}'s Student Portal`
    : "Student Learning Portal";
}, [studentName]);
  const handleEnroll = (course) => {
  setEnrolledCourses((previousCourses) => {
    const alreadyEnrolled = previousCourses.some(
      (item) => item.id === course.id
    );

    if (alreadyEnrolled) {
      return previousCourses;
    }

    return [...previousCourses, course];
  });
};
  const filteredCourses = courses.filter((course) =>
  course.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <>
      <Header
        siteName="Student Learning Portal"
        enrolledCount={enrolledCourses.length}
      />

      <main>
        <h2>Available Courses</h2>
        {loading && <p>Loading courses from API...</p>}

{error && <p>{error}</p>}
        <input
  type="text"
  placeholder="Search courses..."
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
/>
<section>
  <h2>Student Profile</h2>

  <input
    type="text"
    placeholder="Enter your name"
    value={studentName}
    onChange={(event) => setStudentName(event.target.value)}
  />

  <p>
    Student: {studentName || "Not entered"}
  </p>
</section>
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard
  key={course.id}
  course={course}
  onEnroll={handleEnroll}
  isEnrolled={enrolledCourses.some(
    (item) => item.id === course.id
  )}
/>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
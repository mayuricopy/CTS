import EnrolledCoursesPage from "./pages/EnrolledCoursesPage";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import ProfilePage from "./pages/ProfilePage";
import CourseDetailPage from "./pages/CourseDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      <Route
  path="/enrolled"
  element={<EnrolledCoursesPage />}
/>
    </Routes>
  );
}

export default App;
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>

      <nav>
        <Link to="/courses">Courses</Link>
        {" | "}
        <Link to="/profile">Profile</Link>
        {" | "}
        <Link to="/enrolled">My Enrolled Courses</Link>
      </nav>
    </div>
  );
}

export default HomePage;
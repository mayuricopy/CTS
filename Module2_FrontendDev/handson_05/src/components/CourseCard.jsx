function CourseCard({ course, onEnroll, isEnrolled }) {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>Code: {course.code}</p>
      <p>Credits: {course.credits}</p>

      <button
        onClick={() => onEnroll(course)}
        disabled={isEnrolled}
      >
        {isEnrolled ? "Enrolled" : "Enroll"}
      </button>
    </div>
  );
}

export default CourseCard;